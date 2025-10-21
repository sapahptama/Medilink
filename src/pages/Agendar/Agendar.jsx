import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./agendar.css";

const Agendar = () => {
  const [form, setForm] = useState({ 
    fecha: "", 
    hora: "", 
    motivo: "",
    tipo: "consulta"
  });
  
  const [citasAgendadas, setCitasAgendadas] = useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nuevaCita = {
      id: Date.now(),
      ...form,
      estado: 'pendiente'
    };
    setCitasAgendadas([...citasAgendadas, nuevaCita]);
    setForm({ fecha: "", hora: "", motivo: "", tipo: "consulta" });
    navigate("/pagar"); // Redirige a la página de pago
  };

  return (
    <div className="agendar-container">
      <form className="agendar-form" onSubmit={handleSubmit}>
        <h2>Agendar Nueva Cita</h2>
        
        <label>
          Tipo de Cita
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="consulta">Consulta General</option>
            <option value="control">Control</option>
            <option value="emergencia">Emergencia</option>
            <option value="examen">Examen Médico</option>
          </select>
        </label>

        <label>
          Fecha
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>

        <label>
          Hora
          <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        </label>

        <label>
          Motivo de la Consulta
          <textarea 
            name="motivo" 
            value={form.motivo} 
            onChange={handleChange} 
            required 
            rows="3"
            placeholder="Describa el motivo de su consulta..."
          />
        </label>

        <button type="submit">Agendar Cita</button>
      </form>

      {citasAgendadas.length > 0 && (
        <div className="citas-agendadas">
          <h3>Citas Agendadas</h3>
          <div className="citas-lista">
            {citasAgendadas.map(cita => (
              <div key={cita.id} className="cita-item">
                <span><strong>Fecha:</strong> {cita.fecha} {cita.hora}</span>
                <span><strong>Motivo:</strong> {cita.motivo}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendar;