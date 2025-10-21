import React from "react";
import "./Citasdelmedico.css";

function CitasDelMedico() {
  return (
    <div className="citasmedico-container">
      {/* 📝 Encabezado */}
      <div className="citasmedico-header">
        <h2>Mis Citas Agendadas</h2>
      </div>

      {/* 📋 Tabla */}
      <table className="citasmedico-tabla">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Paciente</th>
            <th>Motivo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-03-15<br/>10:00</td>
            <td>Juan Pérez</td>
            <td>Consulta General</td>
            <td className="estado-confirmada">Confirmada</td>
          </tr>
          <tr>
            <td>2024-03-20<br/>15:30</td>
            <td>María Gómez</td>
            <td>Control Pediátrico</td>
            <td className="estado-pendiente">Pendiente</td>
          </tr>
          <tr>
            <td>2024-03-25<br/>09:00</td>
            <td>Carlos Ruiz</td>
            <td>Examen Médico</td>
            <td className="estado-cancelada">Cancelada</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CitasDelMedico;
