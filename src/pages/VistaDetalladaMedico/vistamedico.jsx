import React from "react";
import { Mail, Phone, Star } from "lucide-react";
import "./vistamedico.css";

export default function VistaMedico() {
  const medico = {
    nombre: "Juan",
    apellidos: "Pérez",
    especialidad: "Cardiología",
    telefono: "3001234567",
    email: "juan.perez@email.com",
    experiencia:
      "15 años de experiencia en el área de cardiología clínica e intervencionista.",
    ubicacion: "Clínica Central, Bogotá, Colombia",
    calificacion: 4.8,
    imagen:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", 
  };

  return (
    <div className="vista-medico-container">
 
      <div className="header-medico">
        <div className="avatar-medico">
          <img
            src={medico.imagen}
            alt={`Foto de ${medico.nombre} ${medico.apellidos}`}
            className="imagen-medico"
          />
        </div>
        <div className="info-medico">
          <h2 className="nombre-medico">
            Dr. {medico.nombre} {medico.apellidos}
          </h2>
          <p className="especialidad-medico">{medico.especialidad}</p>
          <div className="calificacion">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.floor(medico.calificacion) ? "#f1c40f" : "none"}
                stroke="#f1c40f"
              />
            ))}
            <span>{medico.calificacion.toFixed(1)}</span>
          </div>
        </div>
      </div>

     
      <div className="detalle-medico">
        <p>
          <Phone className="icono" size={18} /> <strong>Teléfono:</strong>{" "}
          {medico.telefono}
        </p>
        <p>
          <Mail className="icono" size={18} /> <strong>Email:</strong>{" "}
          {medico.email}
        </p>
        <p>
          <strong>Ubicación:</strong> {medico.ubicacion}
        </p>
        <p>
          <strong>Experiencia:</strong> {medico.experiencia}
        </p>
      </div>
    </div>
  );
}


