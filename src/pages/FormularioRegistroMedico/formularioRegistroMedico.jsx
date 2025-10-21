import React, { useState, useRef } from "react";
import "./formularioRegistroMedico.css";


function VistaMedico({ medico, onVolver }) {
  return (
    <div className="vista-medico">
      <h2>Perfil del Médico Registrado</h2>
      <p><strong>Nombre:</strong> {medico.nombre} {medico.apellidos}</p>
      <p><strong>Cédula:</strong> {medico.cedula}</p>
      <p><strong>Correo:</strong> {medico.correo}</p>
      <p><strong>Teléfono:</strong> {medico.telefono}</p>
      <p><strong>Dirección:</strong> {medico.direccion}</p>
      <p><strong>Número de Registro Profesional:</strong> {medico.numeroRegistro}</p>
      <p><strong>RETHUS:</strong> {medico.rethus}</p>
      <p><strong>Especialidad:</strong> {medico.especialidad}</p>
      <p><strong>Universidad:</strong> {medico.universidad || "No especificado"}</p>
      <p><strong>Años de experiencia:</strong> {medico.experiencia || "No especificado"}</p>

      {medico.foto && (
        <div>
          <strong>Foto:</strong>
          <br />
          <img
            src={URL.createObjectURL(medico.foto)}
            alt={`${medico.nombre} ${medico.apellidos}`}
            width={200}
            style={{ marginTop: "10px", borderRadius: "8px" }}
          />
        </div>
      )}

      <button onClick={onVolver} style={{ marginTop: "20px" }}>
        Volver al formulario
      </button>
    </div>
  );
}

const ESPECIALIDADES = [
  "Medicina General",
  "Pediatría",
  "Cardiología",
  "Dermatología",
  "Oftalmología",
  "Psiquiatría",
  "Neurología",
  "Ortopedia y Traumatología",
  "Anestesiología",
  "Otorrinolaringología",
  "Urología",
  "Oncología",
  "Endocrinología",
  "Gastroenterología",
  "Nefrología",
  "Neumología",
  "Reumatología",
  "Medicina Interna",
  "Radiología",
  "Medicina Familiar",
  "Infectología",
  "Hematología",
  "Medicina del Deporte",
  "Medicina Laboral",
  "Medicina Física y Rehabilitación",
  "Geriatría",
  "Genética Médica",
  "Patología",
  "Otros"
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
    estado: "pendiente",
  });

  const [fileNames, setFileNames] = useState({
    hojaVida: "",
    documentoIdentidad: "",
    diplomas: "",
    foto: "",
  });

  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const hojaVidaRef = useRef();
  const documentoIdentidadRef = useRef();
  const diplomasRef = useRef();
  const fotoRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contrasena !== formulario.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí podrías enviar 'formulario' a tu API
    alert("¡Médico registrado con éxito!");
    setMostrarPerfil(true); // mostrar perfil en la misma vista
  };

  const handleVolver = () => {
    setMostrarPerfil(false);
  };

  return (
    <div className="formulario-container">
      {!mostrarPerfil ? (
        <>
          <h2>Registro de Médico</h2>
          <form onSubmit={handleSubmit} className="formulario-medico">
            <div className="grupo">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Cédula:</label>
              <input
                type="text"
                name="cedula"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                name="correo"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="grupo">
              <label>Número de Registro Profesional:</label>
              <input
                type="text"
                name="numeroRegistro"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>RETHUS:</label>
              <input
                type="text"
                name="rethus"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Especialidad:</label>
              <select
                name="especialidad"
                onChange={handleChange}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una especialidad
                </option>
                {ESPECIALIDADES.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>
            <div className="grupo">
              <label>Universidad (opcional):</label>
              <input
                type="text"
                name="universidad"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="grupo">
              <label>Años de experiencia (opcional):</label>
              <input
                type="number"
                name="experiencia"
                onChange={handleChange}
                min="0"
                autoComplete="off"
              />
            </div>

            {/* Seguridad */}
            <div className="grupo">
              <label>Contraseña:</label>
              <input type="password" name="contrasena" onChange={handleChange} required />
            </div>
            <div className="grupo">
              <label>Confirmar contraseña:</label>
              <input type="password" name="confirmarContrasena" onChange={handleChange} required />
            </div>

            <div className="grupo">
              <label>Hoja de Vida (PDF):</label>
              {!fileNames.hojaVida && (
                <button type="button" className="btn-archivo" onClick={() => handleFileClick(hojaVidaRef)}>
                  Seleccionar archivo
                </button>
              )}
              {fileNames.hojaVida && (
                <div className="archivo-confirmado">
                  <span className="nombre-archivo">{fileNames.hojaVida}</span>
                  <span className="mensaje-ok">✅ Archivo cargado correctamente</span>
                </div>
              )}
              <input
                type="file"
                name="hojaVida"
                accept=".pdf"
                ref={hojaVidaRef}
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grupo">
              <label>Cédula o Documento de Identidad (PDF):</label>
              {!fileNames.documentoIdentidad && (
                <button type="button" className="btn-archivo" onClick={() => handleFileClick(documentoIdentidadRef)}>
                  Seleccionar archivo
                </button>
              )}
              {fileNames.documentoIdentidad && (
                <div className="archivo-confirmado">
                  <span className="nombre-archivo">{fileNames.documentoIdentidad}</span>
                  <span className="mensaje-ok">✅ Archivo cargado correctamente</span>
                </div>
              )}
              <input
                type="file"
                name="documentoIdentidad"
                accept=".pdf"
                ref={documentoIdentidadRef}
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grupo">
              <label>Diplomas o Certificados (opcional):</label>
              {!fileNames.diplomas && (
                <button type="button" className="btn-archivo" onClick={() => handleFileClick(diplomasRef)}>
                  Seleccionar archivo
                </button>
              )}
              {fileNames.diplomas && (
                <div className="archivo-confirmado">
                  <span className="nombre-archivo">{fileNames.diplomas}</span>
                  <span className="mensaje-ok">✅ Archivo cargado correctamente</span>
                </div>
              )}
              <input
                type="file"
                name="diplomas"
                accept=".pdf"
                ref={diplomasRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </div>

            <div className="grupo">
              <label>Foto:</label>
              {!fileNames.foto && (
                <button type="button" className="btn-archivo" onClick={() => handleFileClick(fotoRef)}>
                  Seleccionar archivo
                </button>
              )}
              {fileNames.foto && (
                <div className="archivo-confirmado">
                  <span className="nombre-archivo">{fileNames.foto}</span>
                  <span className="mensaje-ok">✅ Archivo cargado correctamente</span>
                </div>
              )}
              <input
                type="file"
                name="foto"
                accept="image/*"
                ref={fotoRef}
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-enviar">
              Registrar Médico
            </button>
          </form>
        </>
      ) : (
        <VistaMedico medico={formulario} onVolver={handleVolver} />
      )}
    </div>
  );
}



