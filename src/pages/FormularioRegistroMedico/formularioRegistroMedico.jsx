import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./formularioRegistroMedico.css";
import { UserContext } from "../../context/UserContext";

const ESPECIALIDADES = [
  "Medicina General", "Pediatría", "Cardiología", "Dermatología",
  "Oftalmología", "Psiquiatría", "Neurología", "Ortopedia y Traumatología",
  "Anestesiología", "Otorrinolaringología", "Urología", "Oncología",
  "Endocrinología", "Gastroenterología", "Nefrología", "Neumología",
  "Reumatología", "Medicina Interna", "Radiología", "Medicina Familiar",
  "Infectología", "Hematología", "Medicina del Deporte", "Medicina Laboral",
  "Medicina Física y Rehabilitación", "Geriatría", "Genética Médica",
  "Patología", "Otros"
];

export default function FormularioRegistroMedico() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    tipoSangre: "",
    numeroRegistro: "",
    rethus: "",
    especialidad: "",
    universidad: "",
    experiencia: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [archivos, setArchivos] = useState({
    hojaVida: null,
    documentoIdentidad: null,
    diplomas: null,
    foto: null,
  });

  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setArchivos((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("https://servidor-medilink.vercel.app/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar médico");
        return;
      }

      alert("✅ Médico registrado con éxito (archivos no se almacenan)");
      setUsuario({
        nombre: formulario.nombre,
        apellido: formulario.apellidos,
        correo: formulario.correo,
        rol: "medico",
      });

      navigate("/inicio-medico");
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="formulario-container">
      <h2>Registro de Médico</h2>
      <form onSubmit={handleSubmit} className="formulario-medico">
        <label>Nombre:</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Apellidos:</label>
        <input type="text" name="apellidos" onChange={handleChange} required />

        <label>Cédula:</label>
        <input type="text" name="cedula" onChange={handleChange} required />

        <label>Correo:</label>
        <input type="email" name="correo" onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="tel" name="telefono" onChange={handleChange} required />

        <label>Dirección:</label>
        <input type="text" name="direccion" onChange={handleChange} required />

        <label>Fecha de nacimiento:</label>
        <input type="date" name="fechaNacimiento" onChange={handleChange} required />

        <label>Tipo de sangre:</label>
        <select name="tipoSangre" onChange={handleChange} required defaultValue="">
          <option value="" disabled>Selecciona tu tipo de sangre</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label>Número de Registro Profesional:</label>
        <input type="text" name="numeroRegistro" onChange={handleChange} required />

        <label>RETHUS:</label>
        <input type="text" name="rethus" onChange={handleChange} required />

        <label>Especialidad:</label>
        <select name="especialidad" onChange={handleChange} required defaultValue="">
          <option value="" disabled>Selecciona una especialidad</option>
          {ESPECIALIDADES.map((esp) => (
            <option key={esp} value={esp}>{esp}</option>
          ))}
        </select>

        <label>Universidad:</label>
        <input type="text" name="universidad" onChange={handleChange} />

        <label>Años de experiencia:</label>
        <input type="number" name="experiencia" min="0" onChange={handleChange} />

        <label>Contraseña:</label>
        <input type="password" name="contrasena" onChange={handleChange} required />

        <label>Confirmar contraseña:</label>
        <input type="password" name="confirmarContrasena" onChange={handleChange} required />

        {/* Archivos visuales */}
        <div className="grupo">
          <label>Hoja de Vida:</label>
          <input type="file" name="hojaVida" accept=".pdf" onChange={handleFileChange} />
          {archivos.hojaVida && <p>✅ {archivos.hojaVida.name}</p>}
        </div>

        <div className="grupo">
          <label>Documento de Identidad:</label>
          <input type="file" name="documentoIdentidad" accept=".pdf" onChange={handleFileChange} />
          {archivos.documentoIdentidad && <p>✅ {archivos.documentoIdentidad.name}</p>}
        </div>

        <div className="grupo">
          <label>Diplomas:</label>
          <input type="file" name="diplomas" accept=".pdf" onChange={handleFileChange} />
          {archivos.diplomas && <p>✅ {archivos.diplomas.name}</p>}
        </div>

        <div className="grupo">
          <label>Foto:</label>
          <input type="file" name="foto" accept="image/*" onChange={handleFileChange} />
          {archivos.foto && <p>✅ {archivos.foto.name}</p>}
        </div>

        <button type="submit" className="btn-enviar">Registrar Médico</button>
      </form>
    </div>
  );
}
