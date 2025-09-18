import React, { useState } from "react";

export default function SeleccionMedico() {
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  const medicos = [
    {
      id: 1,
      nombre: "Dr. Juan Pérez",
      especialidad: "Médico General",
      imagen: "https://randomuser.me/api/portraits/men/32.jpg",
      hora: "10:30 AM",
      puntuacion: 4.5,
    },
    {
      id: 2,
      nombre: "Dra. Maria Gómez",
      especialidad: "Pediatra",
      imagen: "https://randomuser.me/api/portraits/women/44.jpg",
      hora: "11:00 AM",
      puntuacion: 5,
    },
    {
      id: 3,
      nombre: "Dr. Carlos Rodríguez",
      especialidad: "Cardiólogo",
      imagen: "https://randomuser.me/api/portraits/men/65.jpg",
      hora: "3:00 PM",
      puntuacion: 4,
    },
    {
      id: 4,
      nombre: "Dra. Ana Martínez",
      especialidad: "Dermatóloga",
      imagen: "https://randomuser.me/api/portraits/women/68.jpg",
      hora: "4:30 PM",
      puntuacion: 4.8,
    },
  ];

  const seleccionarMedico = (id) => {
    setMedicoSeleccionado(id);
  };

  const confirmarCita = () => {
    if (medicoSeleccionado) {
      const medico = medicos.find((m) => m.id === medicoSeleccionado);
      alert(
        `Has seleccionado a ${medico.nombre} (${medico.especialidad}) a las ${medico.hora}`
      );
    } else {
      alert("Por favor selecciona un médico antes de confirmar.");
    }
  };

  const renderEstrellas = (puntuacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(puntuacion)) {
        estrellas.push("★");
      } else if (i - puntuacion < 1) {
        estrellas.push("☆"); 
      } else {
        estrellas.push("☆");
      }
    }
    return estrellas.join(" ");
  };

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>Selecciona un Médico</h1>
      <div style={styles.grid}>
        {medicos.map((medico) => (
          <div
            key={medico.id}
            style={{
              ...styles.card,
              border:
                medicoSeleccionado === medico.id
                  ? "2px solid #4FC3A1"
                  : "1px solid #ddd",
            }}
            onClick={() => seleccionarMedico(medico.id)}
          >
            <img
              src={medico.imagen}
              alt={medico.nombre}
              style={styles.imagen}
            />
            <h3 style={styles.nombre}>{medico.nombre}</h3>
            <p style={styles.especialidad}>{medico.especialidad}</p>
            <p style={styles.hora}>{medico.hora}</p>
            <p style={styles.estrellas}>{renderEstrellas(medico.puntuacion)}</p>
          </div>
        ))}
      </div>
      <button style={styles.boton} onClick={confirmarCita}>
        Confirmar Cita
      </button>
    </div>
  );
}

const styles = {
  contenedor: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  titulo: {
    color: "#009688", 
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  imagen: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  nombre: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  especialidad: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  hora: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  estrellas: {
    color: "#FFD700", 
    fontSize: "16px",
  },
  boton: {
    padding: "14px 24px",
    fontSize: "16px",
    backgroundColor: "#009688",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

