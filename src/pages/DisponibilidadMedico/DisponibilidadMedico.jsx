import React, { useState, useEffect } from "react";
import "./DisponibilidadMedico.css";
import {
  Calendar,
  Clock,
  AlertCircle,
  Check,
  ArrowLeft,
  Stethoscope,
  User,
  Loader,
  Filter,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://servidor-medilink.vercel.app";
const API_HORARIOS = `${API_URL}/horarios`;
const API_CITAS = `${API_URL}/citas`;
const API_MEDICOS = `${API_URL}/medicos`;
const API_PACIENTES = `${API_URL}/pacientes`;

// Delay helper function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function DisponibilidadMedico() {
  const { idMedico } = useParams();
  const navigate = useNavigate();

  const [disponibilidades, setDisponibilidades] = useState([]);
  const [disponibilidadesFiltradas, setDisponibilidadesFiltradas] = useState(
    []
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [medico, setMedico] = useState(null);
  const [pacienteInfo, setPacienteInfo] = useState(null);
  const [estadoCarga, setEstadoCarga] = useState("");
  const [filtroDia, setFiltroDia] = useState("todos");
  const [diasUnicos, setDiasUnicos] = useState([]);

  // Cache
  const [cacheData, setCacheData] = useState({});

  useEffect(() => {
    if (idMedico) {
      cargarTodosLosDatos();
    }
  }, [idMedico]);

  useEffect(() => {
    aplicarFiltros();
  }, [disponibilidades, filtroDia]);

  const aplicarFiltros = () => {
    if (filtroDia === "todos") {
      setDisponibilidadesFiltradas(disponibilidades);
    } else {
      const filtradas = disponibilidades.filter((slot) => {
        const fechaSlot = new Date(slot.fecha_inicio);
        const diaSlot = fechaSlot.toISOString().split("T")[0];
        return diaSlot === filtroDia;
      });
      setDisponibilidadesFiltradas(filtradas);
    }
  };

  const extraerDiasUnicos = (slots) => {
    const dias = new Set();
    slots.forEach((slot) => {
      const fecha = new Date(slot.fecha_inicio);
      const diaStr = fecha.toISOString().split("T")[0];
      dias.add(diaStr);
    });

    const diasArray = Array.from(dias).sort();
    setDiasUnicos(diasArray);

    // Si hay días únicos, establecer el primer día como filtro por defecto
    if (diasArray.length > 0 && filtroDia === "todos") {
      setFiltroDia(diasArray[0]);
    }
  };

  const cargarTodosLosDatos = async () => {
    // Verificar cache primero
    const cacheKey = `medico_${idMedico}`;
    const now = Date.now();
    const cacheExpiry = 15 * 60 * 1000; // 15 minutos

    if (
      cacheData[cacheKey] &&
      now - cacheData[cacheKey].timestamp < cacheExpiry
    ) {
      console.log("Usando datos en cache");
      const cached = cacheData[cacheKey];
      setMedico(cached.medico);
      setDisponibilidades(cached.disponibilidades);
      extraerDiasUnicos(cached.disponibilidades);
      if (cached.pacienteInfo) {
        setPacienteInfo(cached.pacienteInfo);
      }
      return;
    }

    try {
      setCargando(true);
      setError("");
      setEstadoCarga("Iniciando carga de datos...");

      console.log("Iniciando carga completa de datos para médico:", idMedico);

      // Cargar datos de manera secuencial con delays
      setEstadoCarga("Cargando información del médico...");
      await delay(500);

      const medicoData = await cargarConReintentos(
        () => fetch(`${API_MEDICOS}/${idMedico}`),
        "Información del médico"
      );
      setMedico(medicoData);

      setEstadoCarga("Cargando información del paciente...");
      await delay(800);

      const pacienteData = await cargarInfoPaciente();
      if (pacienteData) {
        setPacienteInfo(pacienteData);
      }

      setEstadoCarga("Cargando horarios disponibles...");
      await delay(800);

      const horariosData = await cargarConReintentos(
        () => fetch(`${API_HORARIOS}/medico/${idMedico}/activos`),
        "Horarios",
        true
      );

      setEstadoCarga("Cargando citas existentes...");
      await delay(800);

      const citasData = await cargarConReintentos(
        () => fetch(`${API_CITAS}/medico/${idMedico}`),
        "Citas",
        true
      );

      setEstadoCarga("Procesando disponibilidades...");
      await delay(300);

      const disponibilidadesProcesadas = procesarDisponibilidades(
        horariosData || [],
        citasData || []
      );

      console.log(
        "Disponibilidades procesadas:",
        disponibilidadesProcesadas.length
      );
      setDisponibilidades(disponibilidadesProcesadas);
      extraerDiasUnicos(disponibilidadesProcesadas);

      // Guardar en cache
      setCacheData((prev) => ({
        ...prev,
        [cacheKey]: {
          medico: medicoData,
          disponibilidades: disponibilidadesProcesadas,
          pacienteInfo: pacienteData,
          timestamp: now,
        },
      }));

      setEstadoCarga("¡Carga completada!");
    } catch (err) {
      console.error("Error en carga completa:", err);
      setError(
        err.message ||
          "Error al cargar los datos. Por favor, intenta más tarde."
      );
    } finally {
      setCargando(false);
      setEstadoCarga("");
    }
  };

  const cargarConReintentos = async (
    fetchFunction,
    nombreRecurso,
    permitirFallar = false,
    maxReintentos = 2
  ) => {
    let reintentos = 0;

    while (reintentos <= maxReintentos) {
      try {
        setEstadoCarga(
          `${nombreRecurso}... ${
            reintentos > 0 ? `(Reintento ${reintentos})` : ""
          }`
        );

        if (reintentos > 0) {
          const delayMs = 1000 * Math.pow(2, reintentos);
          console.log(`Reintentando ${nombreRecurso} en ${delayMs}ms...`);
          await delay(delayMs);
        }

        const response = await fetchFunction();

        if (response.ok) {
          const data = await response.json();
          console.log(`${nombreRecurso} cargado exitosamente`);
          return data;
        } else if (response.status === 500) {
          throw new Error(`Error del servidor al cargar ${nombreRecurso}`);
        } else {
          throw new Error(
            `Error ${response.status} al cargar ${nombreRecurso}`
          );
        }
      } catch (err) {
        reintentos++;
        console.warn(`Error en ${nombreRecurso} (intento ${reintentos}):`, err);

        if (reintentos > maxReintentos) {
          if (permitirFallar) {
            console.log(
              `${nombreRecurso} falló después de ${maxReintentos} reintentos, continuando...`
            );
            return null;
          } else {
            throw new Error(
              `No se pudo cargar ${nombreRecurso} después de ${maxReintentos} reintentos`
            );
          }
        }
      }
    }
  };

  const cargarInfoPaciente = async () => {
    try {
      const usuarioStr = localStorage.getItem("usuario");
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);

        console.log("=== DEBUG INFO PACIENTE ===");
        console.log("Usuario desde localStorage:", usuario);

        if (usuario.rol === "paciente") {
          const pacienteData = await cargarConReintentos(
            () => fetch(`${API_PACIENTES}/usuario/${usuario.id}`),
            "Información del paciente",
            true
          );

          console.log("Datos del paciente desde API:", pacienteData);

          if (pacienteData) {
            const pacienteInfoData = {
              ...usuario,
              idPaciente: pacienteData.id,
            };

            console.log("Info final del paciente:", pacienteInfoData);
            return pacienteInfoData;
          } else {
            console.log("No se encontraron datos del paciente en la API");
          }
        } else {
          console.log("Usuario no es paciente, rol:", usuario.rol);
        }
      } else {
        console.log("No hay usuario en localStorage");
      }
      return null;
    } catch (error) {
      console.error("Error al cargar información del paciente:", error);
      return null;
    }
  };

  const verificarDatosCita = (slot) => {
    console.log("=== VERIFICACIÓN COMPLETA DE DATOS ===");
    console.log("Slot:", slot);
    console.log("Paciente Info:", pacienteInfo);
    console.log("ID Médico desde params:", idMedico);
    console.log("Fecha del slot:", slot.fecha_inicio);
    console.log(
      "Fecha formateada:",
      formatearFechaParaBackend(slot.fecha_inicio)
    );

    const usuarioStr = localStorage.getItem("usuario");
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    console.log("Usuario en localStorage:", usuario);

    console.log("API Endpoints:");
    console.log("- Médicos:", `${API_MEDICOS}/${idMedico}`);
    console.log("- Pacientes:", `${API_PACIENTES}/usuario/${usuario?.id}`);
    console.log("==============================");
  };

  const procesarDisponibilidades = (horarios, citas) => {
    if (!horarios || horarios.length === 0) {
      return [];
    }

    const disponibilidades = [];
    const diasBloqueados = new Set();

    try {
      console.log("Procesando horarios:", horarios.length);
      console.log("Horarios recibidos:", horarios);

      // Identificar días bloqueados
      horarios.forEach((horario) => {
        if (horario.tipo_configuracion === "bloqueado") {
          const inicio = new Date(horario.fecha_inicio);
          const fin = new Date(horario.fecha_fin);

          console.log(
            `Bloqueo encontrado: ${inicio.toISOString()} a ${fin.toISOString()}`
          );

          for (
            let fecha = new Date(inicio);
            fecha <= fin;
            fecha.setDate(fecha.getDate() + 1)
          ) {
            const fechaStr = fecha.toISOString().split("T")[0];
            diasBloqueados.add(fechaStr);
          }
        }
      });

      console.log("Días bloqueados:", Array.from(diasBloqueados));

      // Separar horarios por tipo
      const horariosEspecificos = horarios.filter(
        (h) => h.tipo_configuracion === "especifico"
      );
      const horariosRecurrentes = horarios.filter(
        (h) => h.tipo_configuracion === "recurrente"
      );

      console.log("Horarios específicos:", horariosEspecificos.length);
      console.log("Horarios recurrentes:", horariosRecurrentes.length);

      // PRIMERO: Procesar horarios específicos (tienen máxima prioridad)
      const slotsEspecificos = [];
      horariosEspecificos.forEach((horario) => {
        const fechaStr = new Date(horario.fecha_inicio)
          .toISOString()
          .split("T")[0];
        if (!diasBloqueados.has(fechaStr)) {
          const slots = generarSlotsDisponibles(horario, citas);
          slotsEspecificos.push(...slots);
        }
      });

      // Crear un mapa de slots específicos por fecha y hora para comparación exacta
      const slotsEspecificosMap = new Map();
      slotsEspecificos.forEach(slot => {
        const fechaHora = new Date(slot.fecha_inicio).toISOString();
        slotsEspecificosMap.set(fechaHora, slot);
      });

      console.log("Slots específicos generados:", slotsEspecificos.length);
      console.log("Mapa de slots específicos:", Array.from(slotsEspecificosMap.keys()));

      // SEGUNDO: Procesar horarios recurrentes y filtrar los que coinciden con específicos
      const slotsRecurrentesFiltrados = [];
      horariosRecurrentes.forEach((horario) => {
        console.log("Procesando horario recurrente:", horario);
        const slotsRecurrentes = generarSlotsRecurrentes(
          horario,
          citas,
          diasBloqueados
        );
        
        // Filtrar slots recurrentes que NO coincidan con slots específicos
        const slotsFiltrados = slotsRecurrentes.filter(slotRecurrente => {
          const fechaHoraRecurrente = new Date(slotRecurrente.fecha_inicio).toISOString();
          const tieneEspecifico = slotsEspecificosMap.has(fechaHoraRecurrente);
          
          if (tieneEspecifico) {
            console.log(`❌ EXCLUYENDO slot recurrente: ${fechaHoraRecurrente} - Ya tiene slot específico`);
            return false;
          }
          return true;
        });

        console.log(`Slots recurrentes generados: ${slotsRecurrentes.length}, después de filtro: ${slotsFiltrados.length}`);
        slotsRecurrentesFiltrados.push(...slotsFiltrados);
      });

      // COMBINAR: Específicos + recurrentes filtrados
      disponibilidades.push(...slotsEspecificos, ...slotsRecurrentesFiltrados);

      // Filtrar slots futuros y ordenar
      const ahora = new Date();
      const slotsFuturos = disponibilidades.filter((slot) => {
        const fechaSlot = new Date(slot.fecha_inicio);
        return fechaSlot > ahora;
      });

      console.log("Resumen final:");
      console.log("- Slots específicos:", slotsEspecificos.length);
      console.log("- Slots recurrentes después de filtro:", slotsRecurrentesFiltrados.length);
      console.log("- Total slots futuros:", slotsFuturos.length);

      return slotsFuturos.sort(
        (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
      );
    } catch (error) {
      console.error("Error procesando disponibilidades:", error);
      return [];
    }
  };

  const generarSlotsDisponibles = (horario, citas) => {
    const slots = [];

    try {
      const inicio = new Date(horario.fecha_inicio);
      const fin = new Date(horario.fecha_fin);

      console.log(`Generando slots específicos: ${inicio} a ${fin}`);

      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        return slots;
      }

      const duracionCita = 30 * 60 * 1000;
      let slotActual = new Date(inicio);

      while (slotActual.getTime() + duracionCita <= fin.getTime()) {
        const slotFin = new Date(slotActual.getTime() + duracionCita);

        if (!estaSlotOcupado(slotActual, slotFin, citas)) {
          slots.push({
            id: `slot-${horario.id}-${slotActual.getTime()}`,
            fecha_inicio: slotActual.toISOString(),
            fecha_fin: slotFin.toISOString(),
            tipo: "especifico",
            id_horario: horario.id,
          });
        }

        slotActual = new Date(slotActual.getTime() + duracionCita);
      }
    } catch (error) {
      console.error("Error generando slots específicos:", error);
    }

    console.log(`Slots específicos generados: ${slots.length}`);
    return slots;
  };

  const generarSlotsRecurrentes = (
    horarioRecurrente,
    citas,
    diasBloqueados
  ) => {
    const slots = [];
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];

    try {
      console.log("=== INICIANDO GENERACIÓN DE SLOTS RECURRENTES ===");
      console.log("Horario recurrente:", horarioRecurrente);

      // Obtener horas base del horario recurrente
      const horaInicioBase = new Date(horarioRecurrente.fecha_inicio);
      const horaFinBase = new Date(horarioRecurrente.fecha_fin);
      const duracionSlot = 30 * 60 * 1000; // 30 minutos

      // Obtener rango de recurrencia
      const desde = new Date(horarioRecurrente.fecha_recurrencia_inicio);
      const hasta = new Date(horarioRecurrente.fecha_recurrencia_fin);

      console.log("Rango recurrencia:", {
        desde: desde.toISOString(),
        hasta: hasta.toISOString(),
      });
      console.log("Horas base:", {
        inicio: horaInicioBase.toTimeString(),
        fin: horaFinBase.toTimeString(),
      });

      // Parsear días de la semana
      let diasSemanaObj;
      try {
        diasSemanaObj =
          typeof horarioRecurrente.dias_semana === "string"
            ? JSON.parse(horarioRecurrente.dias_semana)
            : horarioRecurrente.dias_semana;
        console.log("Días de la semana configurados:", diasSemanaObj);
      } catch (e) {
        console.error("Error parseando días semana:", e);
        return slots;
      }

      // Verificar que hay días seleccionados
      const diasActivos = Object.keys(diasSemanaObj).filter(
        (dia) => diasSemanaObj[dia]
      );
      if (diasActivos.length === 0) {
        console.log("No hay días activos en la configuración recurrente");
        return slots;
      }

      console.log("Días activos:", diasActivos);

      // Generar slots para cada día en el rango
      for (
        let fecha = new Date(desde);
        fecha <= hasta;
        fecha.setDate(fecha.getDate() + 1)
      ) {
        const fechaStr = fecha.toISOString().split("T")[0];
        const numeroDia = fecha.getDay();
        const diaActual = diasSemana[numeroDia];

        // Verificar si el día está bloqueado
        if (diasBloqueados.has(fechaStr)) {
          continue;
        }

        // Verificar si el día está en los días seleccionados
        if (diasSemanaObj[diaActual]) {
          // Crear slot para este día
          const slotInicio = new Date(fecha);
          slotInicio.setHours(
            horaInicioBase.getHours(),
            horaInicioBase.getMinutes(),
            horaInicioBase.getSeconds()
          );

          const slotFinBase = new Date(fecha);
          slotFinBase.setHours(
            horaFinBase.getHours(),
            horaFinBase.getMinutes(),
            horaFinBase.getSeconds()
          );

          // Generar slots de 30 minutos
          let slotActual = new Date(slotInicio);

          while (slotActual.getTime() + duracionSlot <= slotFinBase.getTime()) {
            const slotFin = new Date(slotActual.getTime() + duracionSlot);

            // Verificar que el slot no esté ocupado por una cita
            if (!estaSlotOcupado(slotActual, slotFin, citas)) {
              slots.push({
                id: `recurrente-${horarioRecurrente.id}-${slotActual.getTime()}`,
                fecha_inicio: slotActual.toISOString(),
                fecha_fin: slotFin.toISOString(),
                tipo: "recurrente",
                id_horario: horarioRecurrente.id,
              });
            }

            slotActual = new Date(slotActual.getTime() + duracionSlot);
          }
        }
      }
    } catch (error) {
      console.error("Error generando slots recurrentes:", error);
    }

    console.log(`Total slots recurrentes generados: ${slots.length}`);
    return slots;
  };

  const estaSlotOcupado = (slotInicio, slotFin, citas) => {
    if (!citas || !Array.isArray(citas)) return false;

    return citas.some((cita) => {
      if (!cita.fecha) return false;

      const inicioCita = new Date(cita.fecha);
      const finCita = new Date(inicioCita.getTime() + 30 * 60 * 1000);

      return slotInicio < finCita && slotFin > inicioCita;
    });
  };

  const agendarCita = async (slot) => {
    verificarDatosCita(slot);
    if (!pacienteInfo) {
      alert("Debes iniciar sesión como paciente para agendar una cita");
      navigate("/login");
      return;
    }

    if (
      !window.confirm(
        `¿Confirmar cita para el ${formatearFecha(
          slot.fecha_inicio
        )} a las ${formatearHora(slot.fecha_inicio)}?`
      )
    ) {
      return;
    }

    try {
      setCargando(true);

      const fechaParaBackend = formatearFechaParaBackend(slot.fecha_inicio);

      const citaData = {
        id_paciente: pacienteInfo.idPaciente,
        id_medico: parseInt(idMedico),
        fecha: fechaParaBackend,
        link_llamada: `https://meet.jit.si/medilink-${Date.now()}`,
      };

      console.log("Enviando cita con datos:", citaData);

      const response = await fetch(API_CITAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(citaData),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert("¡Cita agendada exitosamente!");

        setDisponibilidades((prev) => prev.filter((s) => s.id !== slot.id));
        setDisponibilidadesFiltradas((prev) =>
          prev.filter((s) => s.id !== slot.id)
        );

        setCacheData({});
      } else {
        console.error("Error del backend:", resultado);
        alert(
          `Error al agendar cita: ${resultado.error || "Error desconocido"}`
        );
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const formatearFechaParaBackend = (fechaISO) => {
    try {
      const fecha = new Date(fechaISO);

      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const dia = String(fecha.getDate()).padStart(2, "0");
      const horas = String(fecha.getHours()).padStart(2, "0");
      const minutos = String(fecha.getMinutes()).padStart(2, "0");
      const segundos = String(fecha.getSeconds()).padStart(2, "0");

      return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return fechaISO.replace("T", " ").split(".")[0];
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatearHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearFechaCorta = (fechaStr) => {
    const fecha = new Date(fechaStr + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const obtenerFotoMedico = () => {
    if (!medico) return null;
    return (
      medico.foto_perfil ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        medico.nombre
      )}+${encodeURIComponent(
        medico.apellido
      )}&background=0d9488&color=fff&size=150`
    );
  };

  const recargarDatos = () => {
    setCacheData({});
    setFiltroDia("todos");
    cargarTodosLosDatos();
  };

  // Estado de carga completo
  if (cargando && (!disponibilidades || disponibilidades.length === 0)) {
    return (
      <div className="disponibilidad-container">
        <div className="carga-completa">
          <Loader size={48} className="spinner" />
          <h3>Cargando disponibilidades...</h3>
          {estadoCarga && <p className="estado-carga">{estadoCarga}</p>}
          <p className="info-carga">Esto puede tomar unos momentos</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="disponibilidad-container">
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
        <div className="acciones-error">
          <button onClick={recargarDatos} className="btn-reintentar">
            Reintentar
          </button>
          <button onClick={() => navigate("/seleccionar-medico")} className="btn-volver">
            <ArrowLeft size={18} />
            Volver a Médicos
          </button>
        </div>
      </div>
    );
  }

  if (!disponibilidades || disponibilidades.length === 0) {
    return (
      <div className="disponibilidad-container">
        <p className="sin-disponibilidad">
          No hay disponibilidad en este momento
        </p>
        <div className="acciones-error">
          <button onClick={recargarDatos} className="btn-reintentar">
            Actualizar
          </button>
          <button onClick={() => navigate("/seleccionar-medico")} className="btn-volver">
            <ArrowLeft size={18} />
            Volver a Médicos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="disponibilidad-container">
      {/* HEADER CON INFORMACIÓN DEL MÉDICO */}
      <div className="header-medico">
        <button
          className="btn-volver-header"
          onClick={() => navigate("/seleccionar-medico")}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="medico-info-header">
          <img
            src={obtenerFotoMedico()}
            alt={medico ? `${medico.nombre} ${medico.apellido}` : "Médico"}
            className="medico-foto-header"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                medico?.nombre || ""
              )}+${encodeURIComponent(
                medico?.apellido || ""
              )}&background=0d9488&color=fff&size=150`;
            }}
          />

          <div className="medico-datos-header">
            <h2>{medico ? `${medico.nombre} ${medico.apellido}` : "Médico"}</h2>
            {medico && (
              <>
                <div className="medico-especialidad-header">
                  <Stethoscope size={16} />
                  <span>{medico.especialidad}</span>
                </div>
                {medico.tarifa > 0 && (
                  <p className="medico-tarifa-header">
                    Tarifa: ${medico.tarifa.toLocaleString("es-CO")}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {pacienteInfo && (
          <div className="paciente-info-header">
            <User size={16} />
            <span>
              {pacienteInfo.nombre} {pacienteInfo.apellido}
            </span>
          </div>
        )}
      </div>

      <div className="disponibilidad-header">
        <Calendar size={24} />
        <h3>Horarios Disponibles</h3>
        <span className="total-disponibles">
          {disponibilidadesFiltradas.length} de {disponibilidades.length}{" "}
          horarios
        </span>
        <button
          onClick={recargarDatos}
          className="btn-actualizar"
          disabled={cargando}
        >
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {/* FILTRO POR DÍA */}
      {diasUnicos.length > 0 && (
        <div className="filtro-dias">
          <div className="filtro-header">
            <Filter size={16} />
            <span>Filtrar por día:</span>
          </div>
          <div className="dias-botones">
            <button
              className={`filtro-dia-btn ${
                filtroDia === "todos" ? "activo" : ""
              }`}
              onClick={() => setFiltroDia("todos")}
            >
              Todos los días
            </button>
            {diasUnicos.map((dia) => (
              <button
                key={dia}
                className={`filtro-dia-btn ${
                  filtroDia === dia ? "activo" : ""
                }`}
                onClick={() => setFiltroDia(dia)}
              >
                {formatearFechaCorta(dia)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="horarios-disponibles">
        {disponibilidadesFiltradas.map((slot) => (
          <div key={slot.id} className={`disponibilidad-item ${slot.tipo}`}>
            <div className="disponibilidad-fecha">
              <div className="fecha-cabecera">
                <span className="dia-semana">
                  {formatearFecha(slot.fecha_inicio)}
                </span>
                <div className="badges-info">
                  <span className="badge-estado disponible">✓ Disponible</span>
                  <span className="badge-tipo">{slot.tipo}</span>
                </div>
              </div>
            </div>

            <div className="disponibilidad-horario">
              <Clock size={18} />
              <span className="horario-rango">
                {formatearHora(slot.fecha_inicio)} -{" "}
                {formatearHora(slot.fecha_fin)}
              </span>
            </div>

            <div className="duracion-info">
              <span>Duración: 30 minutos</span>
            </div>

            <button
              className="btn-agendar"
              onClick={() => agendarCita(slot)}
              disabled={cargando}
            >
              <Check size={18} />
              {cargando ? "Agendando..." : "Agendar Cita"}
            </button>
          </div>
        ))}
      </div>

      {disponibilidadesFiltradas.length === 0 &&
        disponibilidades.length > 0 && (
          <div className="sin-resultados">
            <p>No hay horarios disponibles para el día seleccionado</p>
            <button
              onClick={() => setFiltroDia("todos")}
              className="btn-ver-todos"
            >
              Ver todos los horarios
            </button>
          </div>
        )}

      <div className="info-prioridad">
        <AlertCircle size={16} />
        <p>
          <strong>Nota:</strong> Cada cita tiene una duración de 30 minutos. Los
          horarios mostrados están libres de conflictos con otras citas
          existentes.
        </p>
      </div>
    </div>
  );
}