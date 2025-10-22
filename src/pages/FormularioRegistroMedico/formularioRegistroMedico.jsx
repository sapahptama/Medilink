import React, { useState, useRef, useContext } from "react";
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
    numeroRegistro: "",
    rethus: "",
    especialidad: "",
    universidad: "",
    experiencia: "",
    contrasena: "",
    confirmarContrasena: "",
    hojaVida: null,
    documentoIdentidad: null,
    diplomas: null,
    foto: null,
  });

  const [fileNames, setFileNames] = useState({
    hojaVida: "",
    documentoIdentidad: "",
    diplomas: "",
    foto: "",
  });

  // 🔹 Refs para los inputs de archivo
  const fileRefs = {
    hojaVida: useRef(),
    documentoIdentidad: useRef(),
    diplomas: useRef(),
    foto: useRef(),
  };

  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (files) {
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0]?.name || "",
      }));
    }
  };

  const handleFileClick = (ref) => {
    ref.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formData = new FormData();
    Object.entries(formulario).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:4001/medicos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Médico registrado con éxito");

        // 🧠 Guardar datos importantes en el contexto global
        const usuarioNuevo = {
          id: data.idUsuario,
          nombre: formulario.nombre,
          apellido: formulario.apellidos,
          correo: formulario.correo,
          telefono: formulario.telefono,
          rol: "medico",
        };

        setUsuario(usuarioNuevo);

        // 🔁 Redirigir al panel del médico
        navigate("/inicio-medico");
      } else {
        alert(data.error || "Error al registrar médico");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="formulario-container">
      <h2>Registro de Médico</h2>
      <form onSubmit={handleSubmit} className="formulario-medico">
        <div className="grupo"><label>Nombre:</label>
          <input type="text" name="nombre" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Apellidos:</label>
          <input type="text" name="apellidos" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Cédula:</label>
          <input type="text" name="cedula" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Correo:</label>
          <input type="email" name="correo" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Teléfono:</label>
          <input type="tel" name="telefono" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Dirección:</label>
          <input type="text" name="direccion" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Número de Registro Profesional:</label>
          <input type="text" name="numeroRegistro" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>RETHUS:</label>
          <input type="text" name="rethus" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Especialidad:</label>
          <select name="especialidad" onChange={handleChange} required defaultValue="">
            <option value="" disabled>Selecciona una especialidad</option>
            {ESPECIALIDADES.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
        <div className="grupo"><label>Universidad:</label>
          <input type="text" name="universidad" onChange={handleChange} />
        </div>
        <div className="grupo"><label>Años de experiencia:</label>
          <input type="number" name="experiencia" min="0" onChange={handleChange} />
        </div>
        <div className="grupo"><label>Contraseña:</label>
          <input type="password" name="contrasena" onChange={handleChange} required />
        </div>
        <div className="grupo"><label>Confirmar contraseña:</label>
          <input type="password" name="confirmarContrasena" onChange={handleChange} required />
        </div>

        {/* Archivos */}
        {["hojaVida", "documentoIdentidad", "diplomas", "foto"].map((campo) => (
          <div className="grupo" key={campo}>
            <label>
              {campo === "hojaVida"
                ? "Hoja de Vida"
                : campo === "documentoIdentidad"
                ? "Documento de Identidad"
                : campo === "diplomas"
                ? "Diplomas"
                : "Foto"}
              :
            </label>

            {!fileNames[campo] && (
              <button
                type="button"
                className="btn-archivo"
                onClick={() => handleFileClick(fileRefs[campo])}
              >
                Seleccionar archivo
              </button>
            )}

            {fileNames[campo] && (
              <span className="mensaje-ok">✅ {fileNames[campo]} cargado</span>
            )}

            <input
              type="file"
              name={campo}
              accept={campo === "foto" ? "image/*" : ".pdf"}
              ref={fileRefs[campo]}
              style={{ display: "none" }}
              onChange={handleChange}
              required={campo !== "diplomas"}
            />
          </div>
        ))}

        <button type="submit" className="btn-enviar">Registrar Médico</button>
      </form>
    </div>
  );
}
