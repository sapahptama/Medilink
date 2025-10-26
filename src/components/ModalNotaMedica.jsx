import React, { useState, useEffect } from "react";
import "./ModalNotaMedica.css";

const API_URL = "https://servidor-medilink.vercel.app/registros";

export default function ModalNotaMedica({ cita, usuario, onClose }) {
  const [nota, setNota] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [registroExistente, setRegistroExistente] = useState(null);

  useEffect(() => {
    if (cita?.id) {
      cargarNotaExistente();
    }
  }, [cita]);

  const cargarNotaExistente = async () => {
    try {
      const res = await fetch(`${API_URL}/cita/${cita.id}`);
      const data = await res.json();
      if (data && data.notas) {
        setNota(data.notas);
        setRegistroExistente(data);
      }
    } catch (err) {
      console.error("Error al cargar nota médica:", err);
    }
  };

  const guardarNota = async () => {
    if (!nota.trim()) {
      alert("Por favor, escribe la nota médica antes de guardar.");
      return;
    }

    setGuardando(true);
    try {
      const payload = {
        id_paciente: cita.id_paciente,
        id_medico: usuario.id,
        id_cita: cita.id,
        notas: nota,
      };

      const res = await fetch(
        registroExistente
          ? `${API_URL}/${registroExistente.id}`
          : API_URL,
        {
          method: registroExistente ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar nota");

      alert(registroExistente ? "Nota médica actualizada" : "Nota médica creada");
      onClose(true);
    } catch (err) {
      console.error(err);
      alert("Error al guardar la nota médica");
    } finally {
      setGuardando(false);
    }
  };

  if (!cita) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          🩺 {registroExistente ? "Editar Nota Médica" : "Nueva Nota Médica"}
        </h2>
        <p>
          <strong>Paciente:</strong> {cita.paciente_nombre} {cita.paciente_apellido}
        </p>
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Escribe aquí el resumen de la consulta, recomendaciones o recetas..."
          rows="10"
        />
        <div className="modal-actions">
          <button onClick={onClose} disabled={guardando} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={guardarNota} disabled={guardando} className="btn-guardar">
            {guardando ? "Guardando..." : "Guardar Nota"}
          </button>
        </div>
      </div>
    </div>
  );
}
