import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecuperarContrasena from "./pages/RecuperarContrasena/RecuperarContrasena.jsx";
import Citas from "./pages/citas/citas.jsx";
import Login from "./pages/login/login.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";  
import Splash from "./pages/Splash/Splash.jsx";
import PaginaFormulario from "./pages/FormularioPaciente/PaginaFormulario.jsx";
import AvailableDoctors from "./pages/MedicosDisponibles/Medicos_disponibles.jsx";
import CitasList from "./pages/CitasUsuarios/citasUsuarios.jsx";
import SelectedDoctor from "./pages/SeleccionMedico/SeleccionMedico.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Maria José */}
        <Route path="/" element={<Splash />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/Recuperar" element={<RecuperarContrasena />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        {/* Yenifer */}
        <Route path="/formulario-paciente" element={<PaginaFormulario />} />
        <Route path="/medicos-disponibles" element={<AvailableDoctors />} />
        <Route path="/citas-del-usuario" element={<CitasList />} />
        <Route path="/seleccionar-medico" element={<SelectedDoctor />} />
        <Route path="/citamedico" element={<SelectedDoctor />} />
        {/* Fin Yenifer */}
      </Routes>
    </Router>
  );
}

export default App;
