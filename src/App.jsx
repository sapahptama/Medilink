import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecuperarContrasena from "./pages/RecuperarContrasena/RecuperarContrasena.jsx";
import CitasDelMedico from "./pages/Citas/Citasdelmedico.jsx";
import Login from "./pages/login/login.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Splash from "./pages/splash/Splash.jsx";
import RegistroPacientes from "./pages/RegistroPacientes/RegistroPacientes.jsx";
import AvailableDoctors from "./pages/MedicosDisponibles/Medicos_disponibles.jsx";
import CitasList from "./pages/CitasUsuarios/citasUsuarios.jsx";
import SelectedDoctor from "./pages/SeleccionMedico/SeleccionMedico.jsx";
import FormularioRegistroMedico from "./pages/FormularioRegistroMedico/formularioRegistroMedico.jsx";
import VistaMedico from "./pages/VistaDetalladaMedico/vistamedico.jsx";
import VistaPrincipalMedico from "./pages/VistaPrincipalMedico/vistaprincipalmedico.jsx";
import HistorialMedico from "./pages/HistorialMedico/historialmedico.jsx";
import Pagar from "./pages/Pagar/Pagar.jsx";
import PerfilPaciente from "./pages/Perfil/Perfil.jsx";
import Agendar from "./pages/Agendar/Agendar.jsx";
import UserProfile from "./pages/PerfilMedico/PerfilMedico.jsx";
import SeleccionRegistro from "./pages/Pagar/SeleccionRegistro/SeleccionRegistro.jsx";
import Ajustes from "./pages/Ajustes/Ajustes.jsx";
import Notificaciones from "./pages/Notificaciones/Notificaciones.jsx";
function App() {
  return (
    <>
      <div>
        {/* <ul>
          <li><a href="/">inicio</a></li>
          <li><a href="/SeleccionRegistro">seleccion registro</a></li>
          <li><a href="/citasdelmedico">citas</a></li>
          <li><a href="/Recuperar">recuperar contraseña</a></li>
          <li><a href="inicio">inicio pacientes</a></li>
          <li><a href="login">login</a></li>
          <li><a href="ajustes">ajustes</a></li>
          <li><a href="notificaciones">notificaciones</a></li>
          <hr />
          <li><a href="registro-paciente">registro paciente</a></li>
          <li><a href="medicos-disponibles">medicos disponibles</a></li>
          <li><a href="seleccionar-medico">Seleccionar medicos</a></li>
          <li><a href="perfilmedico">perfil medico</a></li>
          <hr />
          <li><a href="registro-medico">registro medico</a></li>
          <li><a href="vistamedico">Vista delmedico</a></li>
          <li><a href="vistaprincipalmedico">Vista principal medico</a></li>
          <li><a href="historialmedico">historial medico</a></li>
          <hr />
          <li><a href="pagar">pagar</a></li>
          <li><a href="perfil">perfil</a></li>
          <li><a href="agendar">agendar citas</a></li>
          <li><a href="citas-del-usuario">citas del usuario</a></li>
        </ul> */}
      </div>
      <Router>

        <Routes>
          {/* Maria José */}
          <Route path="/" element={<Splash />} />
          <Route path="/citasdelmedico" element={<CitasDelMedico />} />
          <Route path="/Recuperar" element={<RecuperarContrasena />} />
          <Route path="/inicio-paciente" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SeleccionRegistro" element={<SeleccionRegistro />} />
          <Route path="/Ajustes" element={<Ajustes />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />

          {/* Yenifer */}
          <Route path="/registro-paciente" element={<RegistroPacientes />} />
          <Route path="/medicos-disponibles" element={<AvailableDoctors />} />
          <Route path="/seleccionar-medico" element={<SelectedDoctor />} />
          <Route path="/perfilmedico" element={<UserProfile />} />
          <Route path="/citas-del-usuario" element={<CitasList />} />
          {/* Fin Yenifer */}
          {/* Yidis  */}
          <Route path="/registro-medico" element={<FormularioRegistroMedico />} />
          <Route path="/vistamedico" element={<VistaMedico />} />
          <Route path="/vistaprincipalmedico" element={<VistaPrincipalMedico />} />
          <Route path="/historialmedico" element={<HistorialMedico />} />
          {/* Fin Yidis */}
          {/* Camilo */}
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/perfil" element={<PerfilPaciente />} />
          <Route path="/agendar" element={<Agendar />} />
          {/* Fin Camilo */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
