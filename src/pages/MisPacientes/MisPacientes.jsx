import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Activity,
  FileText,
  MessageCircle,
  ClipboardList,
  HeartPulse,
  ArrowLeftCircle,
} from "lucide-react";
import "./MisPacientes.css";

const API_URL = "https://servidor-medilink.vercel.app/pacientes";

export default function MisPacientes() {
  const { usuario } = useContext(UserContext);
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario?.id) {
      cargarPacientes();
    }
  }, [usuario]);

  const cargarPacientes = async () => {
    try {
      const res = await fetch(`${API_URL}/medico/${usuario.id}/pacientes`);
      const data = await res.json();
      setPacientes(data || []);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
    } finally {
      setCargando(false);
    }
  };

  const volverInicio = () => {
    navigate("/inicio-medico");
  };

  if (cargando) return <p className="loading">Cargando pacientes...</p>;

  if (!pacientes.length)
    return (
      <div className="no-pacientes">
        <button className="btn-volver" onClick={volverInicio}>
          <ArrowLeftCircle size={20} /> Volver
        </button>
        <User size={40} className="no-pacientes-icon" />
        <h3>No tienes pacientes registrados</h3>
        <p>Aún no has atendido a ningún paciente.</p>
      </div>
    );

  return (
    <div className="mis-pacientes">
      <div className="header-pacientes">
        <button className="btn-volver" onClick={volverInicio}>
          <ArrowLeftCircle size={20} /> Volver
        </button>
        <h2>
          <HeartPulse size={22} /> Mis Pacientes
        </h2>
      </div>

      <div className="pacientes-grid">
        {pacientes.map((p) => (
          <div key={p.id_paciente || p.id_usuario} className="paciente-card">
            <div className="paciente-info">
              <h3>
                <User size={18} /> {p.nombre} {p.apellido}
              </h3>
              <p>
                <Mail size={14} /> {p.correo || "Sin correo"}
              </p>
              <p>
                <Phone size={14} /> {p.telefono || "Sin teléfono"}
              </p>
              <p>
                <Activity size={14} /> EPS: {p.eps || "No especificada"}
              </p>
              <p>
                <ClipboardList size={14} /> Enfermedades:{" "}
                {p.enfermedades || "No registradas"}
              </p>
            </div>

            <div className="acciones">
              <button
                className="btn-chat"
                onClick={() => alert(`Chat con ${p.nombre}`)}
              >
                <MessageCircle size={16} /> Chat
              </button>
              <button
                className="btn-historial"
                onClick={() => alert(`Historial de ${p.nombre}`)}
              >
                <FileText size={16} /> Historial
              </button>
              <button
                className="btn-notas"
                onClick={() => alert(`Notas médicas de ${p.nombre}`)}
              >
                <ClipboardList size={16} /> Notas
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
