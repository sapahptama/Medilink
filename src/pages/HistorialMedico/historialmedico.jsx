import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ArrowLeftCircle, FileText, User } from "lucide-react";
import "./HistorialMedico.css";

const API_URL = "https://servidor-medilink.vercel.app/registros";

export default function HistorialMedico() {
  const { usuario } = useContext(UserContext);
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarRegistros = async () => {
      try {
        // 1️⃣ Prioriza ID de URL, si no usa el del contexto
        const idPaciente = searchParams.get("id") || usuario?.id_paciente;
        if (!idPaciente) {
          console.warn("⚠️ No se encontró ID del paciente");
          setCargando(false);
          return;
        }

        const res = await fetch(`${API_URL}/paciente/${idPaciente}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("⚠️ Respuesta inesperada del servidor:", data);
          setRegistros([]);
        } else {
          setRegistros(data);
        }
      } catch (err) {
        console.error("Error al cargar registros:", err);
        setRegistros([]);
      } finally {
        setCargando(false);
      }
    };

    cargarRegistros();
  }, [searchParams, usuario]);

  const volver = () => {
    if (usuario?.rol === "paciente") navigate("/inicio-paciente");
    else navigate("/inicio-medico");
  };

  if (cargando) return <p className="loading">Cargando historial médico...</p>;

  return (
    <div className="historial-medico">
      <div className="header-historial">
        <button onClick={volver} className="btn-volver">
          <ArrowLeftCircle size={20} /> Volver
        </button>
        <h2>
          <FileText size={22} /> Historial Médico
        </h2>
      </div>

      {registros.length === 0 ? (
        <div className="no-registros">
          <FileText className="no-icon" />
          <h3>No hay registros médicos</h3>
          <p>
            {usuario?.rol === "paciente"
              ? "Aún no tienes notas médicas registradas."
              : "Este paciente aún no tiene notas registradas."}
          </p>
        </div>
      ) : (
        <div className="registros-list">
          {registros.map((r) => (
            <div key={r.id} className="registro-card">
              <div className="registro-info">
                <p className="medico">
                  <User size={16} /> Dr. {r.medico_nombre} {r.medico_apellido}
                </p>
                <p className="nota">{r.notas}</p>
              </div>
              <small className="id-registro">#Registro: {r.id}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
