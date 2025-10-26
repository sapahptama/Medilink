import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Video,
  ArrowLeftCircle,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MisCitas.css";
import ModalNotaMedica from "../../components/ModalNotaMedica";

const API_URL = "https://servidor-medilink.vercel.app/citas";
const REGISTROS_API = "https://servidor-medilink.vercel.app/registros";

export default function MisCitas() {
  const { usuario } = useContext(UserContext);
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      cargarCitas();
    } else {
      setCargando(false);
    }
  }, [usuario]);

  const cargarCitas = async () => {
    try {
      let endpoint = "";
      if (usuario.rol === "paciente") {
        endpoint = `${API_URL}/paciente/${usuario.id_paciente}/mis-citas`;
      } else if (usuario.rol === "medico") {
        endpoint = `${API_URL}/medico/${usuario.id}/mis-citas`;
      } else {
        setCargando(false);
        return;
      }

      const res = await fetch(endpoint);
      const data = await res.json();
      setCitas(data || []);
    } catch (err) {
      console.error("Error al cargar citas:", err);
    } finally {
      setCargando(false);
    }
  };

  const volverInicio = () => {
    if (!usuario) return navigate("/");
    if (usuario.rol === "medico") navigate("/inicio-medico");
    else if (usuario.rol === "paciente") navigate("/inicio-paciente");
    else navigate("/");
  };

  const obtenerEstadoCita = (fechaStr) => {
    const ahora = new Date();
    const fechaCita = new Date(fechaStr.replace("Z", ""));
    const inicioCita = new Date(fechaCita.getTime() - 5 * 60000); // 5 min antes
    const finCita = new Date(fechaCita.getTime() + 30 * 60000); // dura 30 min

    if (finCita < ahora) return "pasada";
    if (ahora >= inicioCita && ahora <= finCita) return "en-curso";
    return "proxima";
  };

  const abrirNota = async (cita) => {
    if (usuario.rol === "medico") {
      setNotaSeleccionada(cita);
      setModalAbierto(true);
    } else {
      // paciente: ver nota médica existente
      try {
        const res = await fetch(`${REGISTROS_API}/cita/${cita.id}`);
        const data = await res.json();

        if (data && data.notas) {
          alert(`🩺 Nota médica:\n\n${data.notas}`);
        } else {
          alert("Aún no hay nota médica registrada para esta cita.");
        }
      } catch (err) {
        console.error("Error al obtener nota médica:", err);
      }
    }
  };

  const cerrarModal = (recargar) => {
    setModalAbierto(false);
    setNotaSeleccionada(null);
    if (recargar) cargarCitas();
  };

  if (cargando) return <p className="loading">Cargando tus citas...</p>;
  if (!usuario)
    return <p className="empty">Inicia sesión para ver tus citas.</p>;

  return (
    <div className="mis-citas">
      <div className="header-citas">
        <button className="btn-volver" onClick={volverInicio}>
          <ArrowLeftCircle size={22} /> Volver
        </button>
        <h2>
          <Calendar size={22} /> Mis Citas
        </h2>
      </div>

      {citas.length === 0 ? (
        <div className="no-citas">
          <Calendar className="no-citas-icon" />
          <h3>No tienes citas programadas</h3>
          <p>
            {usuario.rol === "medico"
              ? "Aún no tienes consultas agendadas con pacientes."
              : "Pide una cita médica para verlas aquí."}
          </p>
        </div>
      ) : (
        <div className="citas-grid">
          {citas.map((cita) => {
            const estado = obtenerEstadoCita(cita.fecha);
            return (
              <div key={cita.id} className={`cita-card ${estado}`}>
                <div className="cita-info">
                  <p>
                    <Clock size={16} />{" "}
                    {new Date(cita.fecha.replace("Z", "")).toLocaleString(
                      "es-CO",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </p>

                  {usuario.rol === "paciente" ? (
                    <p>
                      <Stethoscope size={16} /> Dr. {cita.medico_nombre}{" "}
                      {cita.medico_apellido}
                    </p>
                  ) : (
                    <p>
                      <User size={16} /> Paciente: {cita.paciente_nombre}{" "}
                      {cita.paciente_apellido}
                    </p>
                  )}
                </div>

                {estado === "pasada" ? (
                  <button
                    className="btn-nota"
                    onClick={() => abrirNota(cita)}
                  >
                    <FileText size={16} /> Nota Médica
                  </button>
                ) : estado === "en-curso" ? (
                  <a
                    href={cita.link_llamada}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-join activo"
                  >
                    <Video size={16} /> Unirse ahora
                  </a>
                ) : (
                  <button className="btn-join proxima" disabled>
                    <Clock size={16} /> Próxima cita
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 🩺 Modal Nota Médica */}
      {modalAbierto && notaSeleccionada && (
        <ModalNotaMedica
          cita={notaSeleccionada}
          usuario={usuario}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
}
