import React, { useState, useEffect } from 'react';
import './ConfigDates.css';
import { Calendar, Clock, Plus, Trash2, AlertCircle, ArrowLeft, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://servidor-medilink.vercel.app/horarios';

export default function ConfigDates() {
  const [modoConfiguracion, setModoConfiguracion] = useState('especifico');
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const navigate = useNavigate();

  // Modo específico
  const [fechaEspecifica, setFechaEspecifica] = useState('');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('17:00');

  // Modo recurrente
  const [diasSeleccionados, setDiasSeleccionados] = useState({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [horaRecurrenteInicio, setHoraRecurrenteInicio] = useState('08:00');
  const [horaRecurrenteFin, setHoraRecurrenteFin] = useState('17:00');

  // Modo bloqueo
  const [fechaBloqueoInicio, setFechaBloqueoInicio] = useState('');
  const [fechaBloqueoFin, setFechaBloqueoFin] = useState('');
  const [motivoBloqueo, setMotivoBloqueo] = useState('');

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const diasNombres = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const usuarioStr = localStorage.getItem('usuario');
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  useEffect(() => {
    if (usuario?.id) {
      cargarHorarios();
    }
  }, [usuario?.id]);

  const cargarHorarios = async () => {
    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/medico/${usuario.id}`);
      if (response.ok) {
        const data = await response.json();
        setHorarios(data);
      } else {
        mostrarMensaje('Error al cargar horarios', 'error');
      }
    } catch (error) {
      console.error('Error al cargar horarios:', error);
      mostrarMensaje('Error de conexión al servidor', 'error');
    } finally {
      setCargando(false);
    }
  };

  const mostrarMensaje = (msg, tipo = 'exito') => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 4000);
  };

  const validarHorario = (inicio, fin) => {
    const inicioObj = new Date(inicio);
    const finObj = new Date(fin);
    
    if (finObj <= inicioObj) {
      mostrarMensaje('La hora de fin debe ser posterior a la de inicio', 'error');
      return false;
    }
    
    // Validar que la diferencia mínima sea de 30 minutos
    const diferencia = (finObj - inicioObj) / (1000 * 60);
    if (diferencia < 30) {
      mostrarMensaje('La duración mínima debe ser de 30 minutos', 'error');
      return false;
    }
    
    return true;
  };

  const agregarHorario = async () => {
    let payload = null;

    try {
      if (modoConfiguracion === 'especifico') {
        if (!fechaEspecifica || !horaInicio || !horaFin) {
          mostrarMensaje('Completa todos los campos', 'error');
          return;
        }

        const inicio = new Date(`${fechaEspecifica}T${horaInicio}:00`);
        const fin = new Date(`${fechaEspecifica}T${horaFin}:00`);

        if (!validarHorario(inicio, fin)) return;

        payload = { 
          fecha_inicio: inicio.toISOString(), 
          fecha_fin: fin.toISOString(),
          id_medico: usuario.id,
          tipo_configuracion: 'especifico'
        };
      } 
      else if (modoConfiguracion === 'recurrente') {
        if (!fechaDesde || !fechaHasta || Object.values(diasSeleccionados).every(d => !d)) {
          mostrarMensaje('Selecciona rango de fechas y al menos un día', 'error');
          return;
        }

        const fechaDesdObj = new Date(fechaDesde);
        const fechaHastaObj = new Date(fechaHasta);

        if (fechaHastaObj <= fechaDesdObj) {
          mostrarMensaje('La fecha "Hasta" debe ser posterior a "Desde"', 'error');
          return;
        }

        // Usar la primera fecha del rango para las horas
        const hoy = new Date(fechaDesdObj);
        hoy.setHours(parseInt(horaRecurrenteInicio.split(':')[0]), parseInt(horaRecurrenteInicio.split(':')[1]), 0);
        
        const finDia = new Date(fechaDesdObj);
        finDia.setHours(parseInt(horaRecurrenteFin.split(':')[0]), parseInt(horaRecurrenteFin.split(':')[1]), 0);

        if (!validarHorario(hoy, finDia)) return;

        payload = {
          fecha_inicio: hoy.toISOString(),
          fecha_fin: finDia.toISOString(),
          id_medico: usuario.id,
          tipo_configuracion: 'recurrente',
          dias_semana: diasSeleccionados,
          fecha_recurrencia_inicio: fechaDesde,
          fecha_recurrencia_fin: fechaHasta
        };
      }
      else if (modoConfiguracion === 'bloqueo') {
        if (!fechaBloqueoInicio || !fechaBloqueoFin) {
          mostrarMensaje('Completa las fechas de bloqueo', 'error');
          return;
        }

        const inicio = new Date(`${fechaBloqueoInicio}T00:00:00`);
        const fin = new Date(`${fechaBloqueoFin}T23:59:59`);

        if (fin <= inicio) {
          mostrarMensaje('La fecha de fin debe ser posterior a la fecha de inicio', 'error');
          return;
        }

        // Usar el endpoint de bloqueo
        const bloqueoPayload = {
          fecha_inicio: inicio.toISOString(),
          fecha_fin: fin.toISOString(),
          id_medico: usuario.id,
          motivo: motivoBloqueo || "Horario no disponible"
        };

        setCargando(true);
        const response = await fetch(`${API_URL}/bloquear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bloqueoPayload)
        });

        const datos = await response.json();

        if (response.ok) {
          mostrarMensaje('✓ Horario bloqueado correctamente', 'exito');
          limpiarFormulario();
          cargarHorarios();
        } else {
          mostrarMensaje(datos.error || 'Error al bloquear horario', 'error');
        }
        setCargando(false);
        return;
      }

      setCargando(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const datos = await response.json();

      if (response.ok) {
        mostrarMensaje('✓ Horario agregado correctamente', 'exito');
        limpiarFormulario();
        cargarHorarios();
      } else {
        mostrarMensaje(datos.error || 'Error al agregar horario', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error de conexión', 'error');
    } finally {
      setCargando(false);
    }
  };

  const eliminarHorario = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este horario?')) return;

    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const datos = await response.json();

      if (response.ok) {
        mostrarMensaje('✓ Horario eliminado correctamente', 'exito');
        cargarHorarios();
      } else {
        mostrarMensaje(datos.error || 'Error al eliminar', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error de conexión', 'error');
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setFechaEspecifica('');
    setHoraInicio('08:00');
    setHoraFin('17:00');
    setDiasSeleccionados({
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
    });
    setFechaDesde('');
    setFechaHasta('');
    setHoraRecurrenteInicio('08:00');
    setHoraRecurrenteFin('17:00');
    setFechaBloqueoInicio('');
    setFechaBloqueoFin('');
    setMotivoBloqueo('');
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearRangoHoras = (inicio, fin) => {
    const inicioStr = new Date(inicio).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const finStr = new Date(fin).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${inicioStr} - ${finStr}`;
  };

  const obtenerNombreTipo = (tipo) => {
    const tipos = {
      'especifico': 'Día Específico',
      'recurrente': 'Recurrente',
      'bloqueado': 'Bloqueado'
    };
    return tipos[tipo] || tipo;
  };

  const obtenerDescripcionRecurrente = (horario) => {
    if (horario.tipo_configuracion === 'recurrente' && horario.dias_semana) {
      try {
        const dias = typeof horario.dias_semana === 'string' 
          ? JSON.parse(horario.dias_semana) 
          : horario.dias_semana;
        const diasActivos = Object.keys(dias).filter(d => dias[d]);
        return diasActivos.length > 0 
          ? diasActivos.map(d => diasNombres[diasSemana.indexOf(d)]).join(', ') 
          : 'N/A';
      } catch (e) {
        console.error(e);
        return 'Error al parsear días';
      }
    }
    return '';
  };

  if (!usuario || usuario.rol !== 'medico') {
    return (
      <div className="config-dates-container">
        <div className="sin-acceso">
          <h2>Acceso Denegado</h2>
          <p>Solo los médicos pueden acceder a esta sección</p>
        </div>
      </div>
    );
  }

  return (
    <div className="config-dates-container">
      {/* HEADER */}
      <header className="config-header">
        <div className="header-info">
          <h1>Gestión de Horarios</h1>
          <p>{usuario.nombre} {usuario.apellido} • {usuario.especialidad || 'Médico'}</p>
          <p className="info-prioridad">
            <strong>Prioridad:</strong> Horarios específicos → Horarios recurrentes → Bloques
          </p>
        </div>

        <button className="btn-volver" onClick={() => navigate('/inicio-medico')}>
          <ArrowLeft size={18} /> Volver al inicio
        </button>
      </header>

      {/* MENSAJE */}
      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          <AlertCircle size={20} />
          <span>{mensaje}</span>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content-config">
        <div className="formulario-principal">
          <div className="tabs">
            <button
              className={`tab ${modoConfiguracion === 'especifico' ? 'activo' : ''}`}
              onClick={() => { setModoConfiguracion('especifico'); limpiarFormulario(); }}
              disabled={cargando}
            >
              📅 Día Específico
            </button>
            <button
              className={`tab ${modoConfiguracion === 'recurrente' ? 'activo' : ''}`}
              onClick={() => { setModoConfiguracion('recurrente'); limpiarFormulario(); }}
              disabled={cargando}
            >
              🔁 Días Recurrentes
            </button>
            <button
              className={`tab ${modoConfiguracion === 'bloqueo' ? 'activo' : ''}`}
              onClick={() => { setModoConfiguracion('bloqueo'); limpiarFormulario(); }}
              disabled={cargando}
            >
              🚫 Bloquear Horario
            </button>
          </div>

          {/* FORMULARIOS */}
          {modoConfiguracion === 'especifico' ? (
            <div className="modo-form">
              <h3>Horario Específico</h3>
              <div className="form-grupo">
                <label htmlFor="fecha-esp">Fecha específica</label>
                <input
                  id="fecha-esp"
                  type="date"
                  value={fechaEspecifica}
                  onChange={(e) => setFechaEspecifica(e.target.value)}
                  disabled={cargando}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-grupo-horas">
                <div className="form-grupo">
                  <label>Hora de Inicio</label>
                  <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    disabled={cargando}
                  />
                </div>
                <div className="form-grupo">
                  <label>Hora de Fin</label>
                  <input
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    disabled={cargando}
                  />
                </div>
              </div>
            </div>
          ) : modoConfiguracion === 'recurrente' ? (
            <div className="modo-form">
              <h3>Horarios Recurrentes</h3>
              <div className="dias-selector">
                <h4>Días de la semana</h4>
                <div className="dias-grid">
                  {diasSemana.map((dia, idx) => (
                    <label key={dia} className="dia-checkbox">
                      <input
                        type="checkbox"
                        checked={diasSeleccionados[dia]}
                        onChange={(e) => 
                          setDiasSeleccionados({
                            ...diasSeleccionados,
                            [dia]: e.target.checked
                          })
                        }
                        disabled={cargando}
                      />
                      <span>{diasNombres[idx]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-grupo-rango">
                <div className="form-grupo">
                  <label>Fecha inicial</label>
                  <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    disabled={cargando}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-grupo">
                  <label>Fecha final</label>
                  <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    disabled={cargando}
                    min={fechaDesde || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="form-grupo-horas">
                <div className="form-grupo">
                  <label>Hora Inicio</label>
                  <input
                    type="time"
                    value={horaRecurrenteInicio}
                    onChange={(e) => setHoraRecurrenteInicio(e.target.value)}
                    disabled={cargando}
                  />
                </div>
                <div className="form-grupo">
                  <label>Hora Fin</label>
                  <input
                    type="time"
                    value={horaRecurrenteFin}
                    onChange={(e) => setHoraRecurrenteFin(e.target.value)}
                    disabled={cargando}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="modo-form">
              <h3>Bloquear Horario</h3>
              <div className="form-grupo">
                <label>Motivo del bloqueo (opcional)</label>
                <input
                  type="text"
                  value={motivoBloqueo}
                  onChange={(e) => setMotivoBloqueo(e.target.value)}
                  placeholder="Ej: Vacaciones, Capacitación..."
                  disabled={cargando}
                />
              </div>
              <div className="form-grupo-rango">
                <div className="form-grupo">
                  <label>Fecha inicio bloqueo</label>
                  <input
                    type="date"
                    value={fechaBloqueoInicio}
                    onChange={(e) => setFechaBloqueoInicio(e.target.value)}
                    disabled={cargando}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-grupo">
                  <label>Fecha fin bloqueo</label>
                  <input
                    type="date"
                    value={fechaBloqueoFin}
                    onChange={(e) => setFechaBloqueoFin(e.target.value)}
                    disabled={cargando}
                    min={fechaBloqueoInicio || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          )}

          <button 
            className="btn-agregar" 
            onClick={agregarHorario}
            disabled={cargando}
          >
            {modoConfiguracion === 'bloqueo' ? <Ban size={20} /> : <Plus size={20} />}
            {cargando ? 'Guardando...' : 
              modoConfiguracion === 'bloqueo' ? 'Bloquear Horario' : 'Agregar Horario'
            }
          </button>
        </div>

        {/* LISTA DE HORARIOS */}
        <div className="horarios-list">
          <h2>Horarios Configurados</h2>
          {cargando && horarios.length === 0 ? (
            <p className="sin-horarios">Cargando horarios...</p>
          ) : horarios.length === 0 ? (
            <p className="sin-horarios">No tienes horarios configurados</p>
          ) : (
            <div className="tabla-horarios">
              {horarios.map((horario) => (
                <div key={horario.id} className="horario-item">
                  <div className="horario-info">
                    <div className="horario-tipo">
                      <span className={`badge-tipo ${horario.tipo_configuracion}`}>
                        {obtenerNombreTipo(horario.tipo_configuracion)}
                      </span>
                      {horario.motivo_bloqueo && (
                        <span style={{marginLeft: '8px', fontSize: '0.8rem', color: '#666'}}>
                          ({horario.motivo_bloqueo})
                        </span>
                      )}
                    </div>
                    <div className="horario-fecha">
                      <Clock size={18} />
                      <div className="fecha-texto">
                        {horario.tipo_configuracion === 'bloqueado' ? (
                          <>
                            <span className="fecha-principal">
                              {new Date(horario.fecha_inicio).toLocaleDateString('es-ES')} - {new Date(horario.fecha_fin).toLocaleDateString('es-ES')}
                            </span>
                            <span className="fecha-secundaria">Horario bloqueado</span>
                          </>
                        ) : (
                          <>
                            <span className="fecha-principal">
                              {formatearRangoHoras(horario.fecha_inicio, horario.fecha_fin)}
                            </span>
                            {horario.tipo_configuracion === 'recurrente' ? (
                              <>
                                <span className="fecha-secundaria">
                                  {obtenerDescripcionRecurrente(horario)}
                                </span>
                                {horario.fecha_recurrencia_inicio && (
                                  <span className="fecha-secundaria">
                                    {new Date(horario.fecha_recurrencia_inicio).toLocaleDateString('es-ES')} - {new Date(horario.fecha_recurrencia_fin).toLocaleDateString('es-ES')}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="fecha-secundaria">
                                {new Date(horario.fecha_inicio).toLocaleDateString('es-ES', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="horario-acciones">
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarHorario(horario.id)}
                      disabled={cargando}
                      title="Eliminar este horario"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}