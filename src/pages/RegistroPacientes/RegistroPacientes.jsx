import React, { useState, useContext } from "react";
import "../../App.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function RegistroPaciente() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    confirmarContrasena: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    tipoSangre: "",
    eps: "",
    enfermedades: ""
  });

  const [loading, setLoading] = useState(false);
  const { setUsuario } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.contrasena !== form.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://servidor-medilink.vercel.app/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar paciente");
        setLoading(false);
        return;
      }

      alert("✅ Registro exitoso");
      setUsuario({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        rol: "paciente"
      });

      navigate("/inicio-paciente");
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-paciente-container">
      <h2>Registro de Paciente</h2>
      <form className="registro-paciente-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Apellido:</label>
        <input type="text" name="apellido" onChange={handleChange} required />

        <label>Correo:</label>
        <input type="email" name="correo" onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="tel" name="telefono" onChange={handleChange} required />

        <label>Dirección:</label>
        <input type="text" name="direccion" onChange={handleChange} required />

        <label>Tipo de documento:</label>
        <select name="tipoDocumento" onChange={handleChange} required>
          <option value="">Seleccione...</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PA">Pasaporte</option>
        </select>

        <label>Número de documento:</label>
        <input type="text" name="numeroDocumento" onChange={handleChange} required />

        <label>Fecha de nacimiento:</label>
        <input type="date" name="fechaNacimiento" onChange={handleChange} required />

        <label>Tipo de sangre:</label>
        <select name="tipoSangre" onChange={handleChange} required>
          <option value="">Seleccione...</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label>EPS:</label>
        <input type="text" name="eps" onChange={handleChange} required />

        <label>¿Enfermedades diagnosticadas?:</label>
        <textarea name="enfermedades" rows="2" onChange={handleChange} />

        <label>Contraseña:</label>
        <input type="password" name="contrasena" onChange={handleChange} required />

        <label>Confirmar contraseña:</label>
        <input type="password" name="confirmarContrasena" onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar Paciente"}
        </button>
      </form>
    </div>
  );
}