import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Video,
  FileText,
  ArrowRightCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProximaCita.css";

const API_URL = "https://servidor-medilink.vercel.app/citas";

export default function ProximaCita() {
  const { usuario } = useContext(UserContext);
  const [cita, setCita] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      cargarCitaProxima();
    } else {
      setCargando(false);
    }
  }, [usuario]);

  const cargarCitaProxima = async () => {
    try {
      let endpoint = "";
      if (usuario.rol === "paciente") {
        endpoint = `${API_URL}/paciente/${usuario.id_paciente}/mis-citas`;
      } else if (usuario.rol === "medico") {
        endpoint = `${API_URL}/medico/${usuario.id}/mis-citas`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      if (!Array.isArray(data)) return;

      // Ordenar por fecha ascendente
      const citasOrdenadas = data.sort(
        (a, b) => new Date(a.fecha) - new Date(b.fecha)
      );

      // Buscar próxima o en curso
      const ahora = new Date();
      const proxima = citasOrdenadas.find((c) => {
        const fecha = new Date(c.fecha.replace("Z", ""));
        const fin = new Date(fecha.getTime() + 30 * 60000);
        return fin > ahora; // aún no ha terminado
      });

      setCita(proxima || null);
    } catch (err) {
      console.error("Error al cargar cita próxima:", err);
    } finally {
      setCargando(false);
    }
  };

  const obtenerEstadoCita = (fechaStr) => {
    const ahora = new Date();
    const fecha = new Date(fechaStr.replace("Z", ""));
    const inicio = new Date(fecha.getTime() - 5 * 60000);
    const fin = new Date(fecha.getTime() + 30 * 60000);
    if (fin < ahora) return "pasada";
    if (ahora >= inicio && ahora <= fin) return "en-curso";
    return "proxima";
  };

  if (cargando)
    return <div className="proxima-cita loading">Cargando próxima cita...</div>;

  if (!cita) {
    return (
      <div className="proxima-cita empty">
        <Calendar size={40} className="icon" />
        <h3>No tienes citas próximas</h3>
        <p>
          {usuario.rol === "medico"
            ? "Aún no tienes consultas programadas."
            : "Agenda una cita médica para verla aquí."}
        </p>
        <button onClick={() => navigate("/mis-citas")} className="btn-ver">
          <ArrowRightCircle size={18} /> Ver mis citas
        </button>
      </div>
    );
  }

  const estado = obtenerEstadoCita(cita.fecha);
  const fechaLocal = new Date(cita.fecha.replace("Z", "")).toLocaleString(
    "es-CO",
    {
      dateStyle: "full",
      timeStyle: "short",
    }
  );

  return (
    <div className={`proxima-cita ${estado}`}>
      <h3>
        {estado === "en-curso" ? "Consulta en curso" : "Próxima consulta"}
      </h3>

      <p className="fecha">
        <Clock size={16} /> {fechaLocal}
      </p>

      {usuario.rol === "paciente" ? (
        <p className="info">
          <Stethoscope size={16} /> Dr. {cita.medico_nombre}{" "}
          {cita.medico_apellido}
        </p>
      ) : (
        <p className="info">
          <User size={16} /> Paciente: {cita.paciente_nombre}{" "}
          {cita.paciente_apellido}
        </p>
      )}

      <div className="acciones">
        <button onClick={() => navigate("/mis-citas")} className="btn-ver">
          <ArrowRightCircle size={18} /> Ver detalles
        </button>

        {estado === "en-curso" ? (
          <a
            href={cita.link_llamada}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-join"
          >
            <Video size={18} /> Unirse ahora
          </a>
        ) : null}
      </div>
    </div>
  );
}
