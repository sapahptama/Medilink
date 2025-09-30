import React, { useState } from "react";
import "./pagar.css";

const Pagar = () => {
  const [citas, setCitas] = useState([
    { 
      id: 1, 
      medico: "Dra. Ana Torres", 
      especialidad: "Cardiología",
      fecha: "2024-03-20", 
      hora: "15:30", 
      estado: "pendiente", 
      valor: 85000,
      tipo: "Consulta Especializada"
    },
    { 
      id: 2, 
      medico: "Dr. Luis Gómez", 
      especialidad: "Pediatría",
      fecha: "2024-03-25", 
      hora: "09:00", 
      estado: "pendiente", 
      valor: 65000,
      tipo: "Control"
    }
  ]);
  
  const [seleccionada, setSeleccionada] = useState(null);

  const pagarCita = id => {
    setCitas(citas.map(c => c.id === id ? { ...c, estado: "pagada" } : c));
    setSeleccionada(null);
  };

  const citasPendientes = citas.filter(c => c.estado === "pendiente");

  return (
    <div className="pagar-container">
      <h2>Pagar Citas Pendientes</h2>
      
      {citasPendientes.length === 0 ? (
        <div style={{textAlign: 'center', color: '#7f8c8d', fontSize: '1.1rem'}}>
          No tienes citas pendientes de pago
        </div>
      ) : (
        <>
          <ul className="pagar-lista">
            {citasPendientes.map(cita => (
              <li key={cita.id} className={seleccionada === cita.id ? "seleccionada" : ""}>
                <div className="pagar-info">
                  <h3>{cita.medico}</h3>
                  <div className="pagar-detalles">
                    {cita.especialidad} • {cita.tipo}
                  </div>
                  <div className="pagar-detalles">
                    {cita.fecha} a las {cita.hora}
                  </div>
                </div>
                <div className="pagar-valor">${cita.valor.toLocaleString()}</div>
                <button 
                  className="boton-seleccionar"
                  onClick={() => setSeleccionada(seleccionada === cita.id ? null : cita.id)}
                >
                  {seleccionada === cita.id ? 'Deseleccionar' : 'Seleccionar'}
                </button>
              </li>
            ))}
          </ul>
          
          {seleccionada && (
            <button 
              className="boton-pagar" 
              onClick={() => pagarCita(seleccionada)}
            >
              Pagar Cita Seleccionada
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Pagar;