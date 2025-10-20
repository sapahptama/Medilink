import React, { useState } from "react";
import "./agendar.css";

const Agendar = () => {
  const [form, setForm] = useState({ 
    medico: "", 
    fecha: "", 
    hora: "", 
    motivo: "",
    tipo: "consulta"
  });
  
  const [citasAgendadas, setCitasAgendadas] = useState([]);
  
  const medicos = [
    { id: 1, nombre: "yidis iriana cuesta", motivo: "gripa intensa" },
    { id: 2, nombre: "David mejia", motivo: "grano con dolor en el area del brazo" },
    { id: 3, nombre: "Marta Ruiz", motivo: "dolor intenso en el area abdominal" }
  ];

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
    setForm({ medico: "", fecha: "", hora: "", motivo: "", tipo: "consulta" });
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
          Médico
          <select name="medico" value={form.medico} onChange={handleChange} required>
            <option value="">Seleccione un médico</option>
            {medicos.map(m => (
              <option key={m.id} value={m.nombre}>
                {m.nombre} - {m.especialidad}
              </option>
            ))}
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
                <span><strong>Médico:</strong> {cita.medico}</span>
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