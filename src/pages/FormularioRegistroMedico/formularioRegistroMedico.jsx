import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./formularioRegistroMedico.css";
import { UserContext } from "../../context/UserContext";

const FormularioRegistroMedico = () => {
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    cedula: "",
    direccion: "",
    fechaNacimiento: "",
    tipoSangre: "",
    especialidad: "",
    experiencia: "",
    numeroRegistro: "",
    rethus: "",
    universidad: "",
  });

  const [archivos, setArchivos] = useState({
    foto: null, // única que se envía
    documento: null,
    diploma: null,
    certificado: null,
  });

  // 🔹 Manejo de archivos
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (name === "foto") {
      // convertir imagen a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setArchivos((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // solo visual
      setArchivos((prev) => ({ ...prev, [name]: file }));
    }
  };

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // 🔹 Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      ...formulario,
      foto_perfil: archivos.foto || null, // solo la foto se guarda realmente
    };

    try {
      const res = await fetch("https://servidor-medilink.vercel.app/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar médico");
        return;
      }

      console.log("✅ Registro exitoso:", data);
      alert("✅ Médico registrado con éxito");

      setUsuario({
        nombre: formulario.nombre,
        apellido: formulario.apellidos,
        correo: formulario.correo,
        rol: "medico",
      });

      setTimeout(() => {
        console.log("➡️ Redirigiendo a /inicio-medico...");
        navigate("/inicio-medico");
      }, 300);
    } catch (error) {
      console.error("❌ Error al registrar médico:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="contenedor-formulario-medico">
      <h2>Registro de Médico</h2>

      <form onSubmit={handleSubmit}>
        <div className="grupo">
          <label>Nombre:</label>
          <input type="text" name="nombre" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Apellidos:</label>
          <input type="text" name="apellidos" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Correo electrónico:</label>
          <input type="email" name="correo" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Contraseña:</label>
          <input type="password" name="contrasena" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Confirmar contraseña:</label>
          <input type="password" name="confirmarContrasena" onChange={handleChange} required />
        </div>

        {/* 🔹 Foto de perfil */}
        <div className="grupo">
          <label>Foto de perfil:</label>
          <input type="file" name="foto" accept="image/*" onChange={handleFileChange} />
          {archivos.foto && (
            <img
              src={archivos.foto}
              alt="Previsualización"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginTop: 10,
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
          )}
        </div>

        {/* 🔹 Archivos visuales (no se envían) */}
        <div className="grupo">
          <label>Documento de identidad:</label>
          <input type="file" name="documento" onChange={handleFileChange} />
          {archivos.documento && <p>📄 {archivos.documento.name}</p>}
        </div>

        <div className="grupo">
          <label>Diploma:</label>
          <input type="file" name="diploma" onChange={handleFileChange} />
          {archivos.diploma && <p>🎓 {archivos.diploma.name}</p>}
        </div>

        <div className="grupo">
          <label>Certificado:</label>
          <input type="file" name="certificado" onChange={handleFileChange} />
          {archivos.certificado && <p>📜 {archivos.certificado.name}</p>}
        </div>

        <div className="grupo">
          <label>Cédula:</label>
          <input type="text" name="cedula" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Dirección:</label>
          <input type="text" name="direccion" onChange={handleChange} />
        </div>

        <div className="grupo">
          <label>Fecha de nacimiento:</label>
          <input type="date" name="fechaNacimiento" onChange={handleChange} />
        </div>

        {/* 🔹 Select de tipo de sangre */}
        <div className="grupo">
          <label>Tipo de sangre:</label>
          <select name="tipoSangre" onChange={handleChange} required>
            <option value="">Seleccionar...</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* 🔹 Select de especialidad médica */}
        <div className="grupo">
          <label>Especialidad:</label>
          <select name="especialidad" onChange={handleChange} required>
            <option value="">Seleccionar...</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Neurología">Neurología</option>
            <option value="Oftalmología">Oftalmología</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Psiquiatría">Psiquiatría</option>
            <option value="Urología">Urología</option>
            <option value="Anestesiología">Anestesiología</option>
            <option value="Radiología">Radiología</option>
            <option value="Cirugía">Cirugía</option>
          </select>
        </div>

        <div className="grupo">
          <label>Años de experiencia:</label>
          <input type="number" name="experiencia" onChange={handleChange} />
        </div>

        <div className="grupo">
          <label>Número de registro:</label>
          <input type="text" name="numeroRegistro" onChange={handleChange} required />
        </div>

        <div className="grupo">
          <label>Rethus:</label>
          <input type="text" name="rethus" onChange={handleChange} />
        </div>

        <div className="grupo">
          <label>Universidad:</label>
          <input type="text" name="universidad" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-enviar">
          Registrar Médico
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistroMedico;
