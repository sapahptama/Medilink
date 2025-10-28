import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Droplet, 
  FileText, 
  GraduationCap, 
  Briefcase,
  Stethoscope,
  Heart,
  Edit,
  Shield
} from "lucide-react";
import "./perfil.css";

function Perfil() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfilCompleto, setPerfilCompleto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const volver = () => {
    if (usuario?.rol === "medico") {
      navigate("/inicio-medico");
    } else {
      navigate("/inicio-paciente");
    }
  };

  useEffect(() => {
    const cargarPerfilCompleto = async () => {
      try {
        setCargando(true);
        setError(null);

        if (usuario?.rol === "medico" && usuario?.id) {
          // Cargar datos completos del médico
          const response = await fetch(`https://servidor-medilink.vercel.app/medicos/${usuario.id}`);
          if (!response.ok) throw new Error("Error al cargar datos del médico");
          const datosMedico = await response.json();
          setPerfilCompleto(datosMedico);
        } 
        else if (usuario?.rol === "paciente" && usuario?.id_paciente) {
          // Cargar datos completos del paciente
          const response = await fetch(`https://servidor-medilink.vercel.app/pacientes/${usuario.id_paciente}`);
          if (!response.ok) throw new Error("Error al cargar datos del paciente");
          const datosPaciente = await response.json();
          setPerfilCompleto(datosPaciente);
        }
        else {
          // Si no hay datos específicos, usar la información básica del contexto
          setPerfilCompleto(usuario);
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
        setError("No se pudieron cargar los datos completos del perfil");
        setPerfilCompleto(usuario); // Usar datos básicos como fallback
      } finally {
        setCargando(false);
      }
    };

    if (usuario) {
      cargarPerfilCompleto();
    }
  }, [usuario]);

  if (cargando) {
    return (
      <div className="perfil-container">
        <div className="perfil-cargando">
          <div className="spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const datos = perfilCompleto || usuario;

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <button onClick={volver} className="btn-volver">
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1>Mi Perfil</h1>
      </header>

      <div className="perfil-content">
        <div className="perfil-card">
          {/* SECCIÓN AVATAR E INFORMACIÓN BÁSICA */}
          <div className="avatar-section">
            <div className="avatar">
              {datos.foto_perfil ? (
                <img src={datos.foto_perfil} alt="Foto de perfil" className="avatar-img" />
              ) : (
                <User size={40} />
              )}
            </div>
            <div className="user-info">
              <h2>{datos.nombre || "Usuario"} {datos.apellido || ""}</h2>
              <div className="user-meta">
                <span className={`user-role ${datos.rol}`}>
                  {datos.rol === "medico" ? "👨‍⚕️ Médico" : 
                   datos.rol === "paciente" ? "😊 Paciente" : 
                   "👤 Usuario"}
                </span>
                {datos.numero_documento && (
                  <span className="user-document">ID: {datos.numero_documento}</span>
                )}
              </div>
            </div>
          </div>

          {/* INFORMACIÓN PERSONAL */}
          <div className="info-section">
            <h3 className="section-title">
              <User className="section-icon" />
              Información Personal
            </h3>
            
            <div className="info-grid">
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <label>Email</label>
                  <p>{datos.correo || "No disponible"}</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <label>Teléfono</label>
                  <p>{datos.telefono || "No disponible"}</p>
                </div>
              </div>

              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <label>Dirección</label>
                  <p>{datos.direccion || datos.direccion_consultorio || "No disponible"}</p>
                </div>
              </div>

              <div className="info-item">
                <Calendar className="info-icon" />
                <div>
                  <label>Fecha de Nacimiento</label>
                  <p>{datos.fecha_nacimiento ? new Date(datos.fecha_nacimiento).toLocaleDateString() : "No disponible"}</p>
                </div>
              </div>

              <div className="info-item">
                <Droplet className="info-icon" />
                <div>
                  <label>Tipo de Sangre</label>
                  <p>{datos.tipo_sangre || "No disponible"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* INFORMACIÓN ESPECÍFICA SEGÚN ROL */}
          {datos.rol === "medico" && (
            <div className="info-section">
              <h3 className="section-title">
                <Stethoscope className="section-icon" />
                Información Profesional
              </h3>
              
              <div className="info-grid">
                {datos.especialidad && (
                  <div className="info-item">
                    <Briefcase className="info-icon" />
                    <div>
                      <label>Especialidad</label>
                      <p>{datos.especialidad}</p>
                    </div>
                  </div>
                )}

                {datos.anios_experiencia !== undefined && (
                  <div className="info-item">
                    <Calendar className="info-icon" />
                    <div>
                      <label>Años de Experiencia</label>
                      <p>{datos.anios_experiencia} años</p>
                    </div>
                  </div>
                )}

                {datos.tarifa && (
                  <div className="info-item">
                    <FileText className="info-icon" />
                    <div>
                      <label>Tarifa Consulta</label>
                      <p>${parseFloat(datos.tarifa).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {datos.numeroRegistro && (
                  <div className="info-item">
                    <Shield className="info-icon" />
                    <div>
                      <label>Número de Registro</label>
                      <p>{datos.numeroRegistro}</p>
                    </div>
                  </div>
                )}

                {datos.universidad && (
                  <div className="info-item">
                    <GraduationCap className="info-icon" />
                    <div>
                      <label>Universidad</label>
                      <p>{datos.universidad}</p>
                    </div>
                  </div>
                )}

                {datos.rethus && (
                  <div className="info-item">
                    <FileText className="info-icon" />
                    <div>
                      <label>RETHUS</label>
                      <p>{datos.rethus}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {datos.rol === "paciente" && (
            <div className="info-section">
              <h3 className="section-title">
                <Heart className="section-icon" />
                Información Médica
              </h3>
              
              <div className="info-grid">
                {datos.eps && (
                  <div className="info-item">
                    <Shield className="info-icon" />
                    <div>
                      <label>EPS</label>
                      <p>{datos.eps}</p>
                    </div>
                  </div>
                )}

                {datos.tipo_documento && (
                  <div className="info-item">
                    <FileText className="info-icon" />
                    <div>
                      <label>Tipo de Documento</label>
                      <p>{datos.tipo_documento}</p>
                    </div>
                  </div>
                )}

                {datos.enfermedades && (
                  <div className="info-item full-width">
                    <Heart className="info-icon" />
                    <div>
                      <label>Enfermedades/Condiciones</label>
                      <p className="enfermedades-text">{datos.enfermedades}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECCIÓN DE ACCIONES */}
          <div className="actions-section">
            <button className="btn-editar">
              <Edit size={18} />
              Editar Perfil
            </button>
            <button className="btn-cerrar-sesion">
              Cerrar Sesión
            </button>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;