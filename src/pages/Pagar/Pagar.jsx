import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaUniversity, FaMoneyBill, FaMobileAlt } from "react-icons/fa";
import "./Pagar.css";

export default function Pagar() {
  const navigate = useNavigate();

  const [metodo, setMetodo] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");
  const [numeroNequi, setNumeroNequi] = useState("");

  const handleConfirmar = () => {
    if (!metodo) {
      alert("Por favor selecciona un método de pago.");
      return;
    }
    alert(`Pago confirmado con ${metodo}`);
    
  };

  // Función de volver 
  const handleBack = () => {
    navigate("/inicio"); // <-- va a inicio
    // Si prefieres "volver a la página anterior" usa: navigate(-1)
  };

  return (
    <div className="pagar-container">
      <button className="back-button" onClick={handleBack} aria-label="Volver a inicio">
        <FaArrowLeft size={18} /> <span>Inicio</span>
      </button>

      <h2>Confirmar Pago</h2>

      {/* Resumen */}
      <div className="resumen">
        <h3>Resumen de tu cita</h3>
        <p><strong>Doctor:</strong> Dra. Lopez</p>
        <p><strong>Especialidad:</strong> Pediatria</p>
        <p><strong>Fecha:</strong> 10 de Octubre 2025</p>
        <p><strong>Hora:</strong> 10:30 AM</p>
        <p><strong>Precio:</strong> $80.000</p>
      </div>

      {/* Métodos de pago */}
      <div className="metodos">
        <h3>Elige tu método de pago</h3>

        <button className="metodo-btn" onClick={() => setMetodo("Tarjeta")}>
          <FaCreditCard size={18} /> Tarjeta de Crédito/Débito
        </button>

        {metodo === "Tarjeta" && (
          <div className="form-pago">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
            />
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/AA)"
              value={fechaVenc}
              onChange={(e) => setFechaVenc(e.target.value)}
            />
          </div>
        )}

        <button className="metodo-btn" onClick={() => setMetodo("PSE")}>
          <FaUniversity size={18} /> PSE - Transferencia
        </button>

        <button className="metodo-btn" onClick={() => setMetodo("Nequi")}>
          <FaMobileAlt size={18} /> Nequi
        </button>

        {metodo === "Nequi" && (
          <div className="form-pago">
            <input
              type="text"
              placeholder="Número de celular Nequi"
              value={numeroNequi}
              onChange={(e) => setNumeroNequi(e.target.value)}
            />
          </div>
        )}

        <button className="metodo-btn" onClick={() => setMetodo("Efectivo")}>
          <FaMoneyBill size={18} /> Pago en la clínica
        </button>
      </div>

      <button className="confirmar-btn" onClick={handleConfirmar}>
        Confirmar Pago
      </button>
    </div>
  );
}
