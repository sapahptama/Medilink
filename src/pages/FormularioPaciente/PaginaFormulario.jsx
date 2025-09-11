import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import '../../App.css'

function PaginaFormulario() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    enfermedades: '',
    eps: '',
    tipoDocumento: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Formulario de Usuario</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          ¿De qué enfermedades sufres?
          <textarea
            name="enfermedades"
            value={form.enfermedades}
            onChange={handleChange}
            placeholder="Ejemplo: Diabetes, hipertensión, etc."
            rows={2}
            required
          />
        </label>
        <br />
        <label>
          EPS:
          <input
            type="text"
            name="eps"
            value={form.eps}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo de documento:
          <select
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PA">Pasaporte</option>
          </select>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {submitted && (
        <div className="result">
          <h2>Datos enviados:</h2>
          <p>Nombre: {form.nombre}</p>
          <p>Email: {form.email}</p>
          <p>Enfermedades: {form.enfermedades}</p>
          <p>EPS: {form.eps}</p>
          <p>Tipo de documento: {form.tipoDocumento}</p>
        </div>
      )}
    </>
  )
}

export default PaginaFormulario
