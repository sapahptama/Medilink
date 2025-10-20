import React, { useState } from "react";
import "./vistaprincipalmedico.css";

export default function PrincipalMedico() {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const pacientes = [
    {
      id: 1,
      nombre: "Carlos Ramírez",
      motivo: "Consulta general",
      fecha: "03/01/2025 - 10:00 AM",
      edad: 45,
      sintomas: "Dolor de cabeza y mareo ocasional.",
      diagnostico: "Posible hipertensión leve.",
      tratamiento: "Control de presión y dieta baja en sal.",
    },
    {
      id: 2,
      nombre: "Laura Martínez",
      motivo: "Control pediátrico",
      fecha: "05/02/2025 - 2:00 PM",
      edad: 6,
      sintomas: "Ninguno, visita de control.",
      diagnostico: "Salud general estable.",
      tratamiento: "Revisión de vacunas al día.",
    },
    {
      id: 3,
      nombre: "Andrés Torres",
      motivo: "Revisión cardiológica",
      fecha: "06/03/2025 - 3:30 AM",
      edad: 59,
      sintomas: "Dolor en el pecho al esfuerzo.",
      diagnostico: "Angina estable.",
      tratamiento: "Ejercicio moderado y control con medicación.",
    },
    {
      id: 5,
      nombre: "Matías Martínez",
      motivo: "Psiquiatría",
      fecha: "12/04/2025 - 1:30 AM",
      edad: 29,
      sintomas: "No come, está flaco.",
      diagnostico: "Salud general estable.",
      tratamiento: "Ejercicio moderado y control con medicación.",
    },
    {
      id: 6,
      nombre: "Sofía Rojas",
      motivo: "Dermatología",
      fecha: "18/05/2025 - 11:00 AM",
      edad: 22,
      sintomas: "Manchas rojas en la piel.",
      diagnostico: "Dermatitis alérgica.",
      tratamiento: "Cremas tópicas y evitar perfumes fuertes.",
    },
    {
      id: 7,
      nombre: "Luis Herrera",
      motivo: "Odontología",
      fecha: "02/06/2025 - 9:30 AM",
      edad: 41,
      sintomas: "Dolor de muela persistente.",
      diagnostico: "Caries avanzada.",
      tratamiento: "Endodoncia programada.",
    },
    {
      id: 8,
      nombre: "Mariana Castro",
      motivo: "Oftalmología",
      fecha: "15/07/2025 - 8:45 AM",
      edad: 27,
      sintomas: "Visión borrosa al leer.",
      diagnostico: "Miopía leve.",
      tratamiento: "Uso de gafas correctivas.",
    },
    {
      id: 9,
      nombre: "Ricardo López",
      motivo: "Ortopedia",
      fecha: "21/08/2025 - 1:00 PM",
      edad: 53,
      sintomas: "Dolor en la rodilla derecha.",
      diagnostico: "Desgaste articular.",
      tratamiento: "Fisioterapia y suplemento de colágeno.",
    },
    {
      id: 10,
      nombre: "Valentina Ruiz",
      motivo: "Psicología",
      fecha: "10/09/2025 - 4:15 PM",
      edad: 18,
      sintomas: "Estrés académico.",
      diagnostico: "Ansiedad leve.",
      tratamiento: "Terapia cognitivo-conductual.",
    },
    {
      id: 11,
      nombre: "Juan Esteban Pérez",
      motivo: "Consulta nutricional",
      fecha: "08/10/2025 - 9:00 AM",
      edad: 35,
      sintomas: "Aumento de peso en últimos meses.",
      diagnostico: "Obesidad grado I.",
      tratamiento: "Plan alimenticio y caminatas diarias.",
    },
    {
      id: 12,
      nombre: "Camila Duarte",
      motivo: "Medicina interna",
      fecha: "03/11/2025 - 2:30 PM",
      edad: 47,
      sintomas: "Cansancio general y fiebre baja.",
      diagnostico: "Infección viral leve.",
      tratamiento: "Hidratación y reposo.",
    },
    {
      id: 13,
      nombre: "Felipe Gómez",
      motivo: "Neurología",
      fecha: "27/12/2025 - 10:45 AM",
      edad: 51,
      sintomas: "Migrañas recurrentes.",
      diagnostico: "Cefalea tensional.",
      tratamiento: "Relajación, sueño adecuado y medicación preventiva.",
    },
    {
      id: 14,
      nombre: "Natalia Vega",
      motivo: "Medicina general",
      fecha: "09/12/2025 - 8:30 AM",
      edad: 30,
      sintomas: "Dolor de garganta y fiebre.",
      diagnostico: "Amigdalitis bacteriana.",
      tratamiento: "Antibióticos y reposo por 3 días.",
    },
    {
      id: 15,
      nombre: "Samuel Torres",
      motivo: "Cardiología",
      fecha: "19/12/2025 - 1:00 PM",
      edad: 63,
      sintomas: "Palpitaciones al caminar.",
      diagnostico: "Arritmia leve.",
      tratamiento: "Medicamento betabloqueador y control mensual.",
    },
  ];

  const agruparPorMes = (lista) => {
    const grupos = {};
    lista.forEach((p) => {
      const fecha = p.fecha.split(" - ")[0];
      const [dia, mes, año] = fecha.split("/");

      const nombreMes = new Date(año, parseInt(mes) - 1, 1).toLocaleString("es-ES", {
        month: "long",
        year: "numeric",
      });

      if (!grupos[nombreMes]) grupos[nombreMes] = [];
      grupos[nombreMes].push(p);
    });
    return grupos;
  };

  const pacientesPorMes = agruparPorMes(pacientes);

  const mesesOrdenados = Object.keys(pacientesPorMes).sort((a, b) => {
    const [mesA, añoA] = a.split(" ");
    const [mesB, añoB] = b.split(" ");
    const fechaA = new Date(parseInt(añoA), new Date(Date.parse(mesA + " 1, " + añoA)).getMonth());
    const fechaB = new Date(parseInt(añoB), new Date(Date.parse(mesB + " 1, " + añoB)).getMonth());
    return fechaA - fechaB;
  });

  const filtro = busqueda.toLowerCase();


  const mesesFiltrados = mesesOrdenados.filter((mes) => {
    const coincideMes = mes.toLowerCase().includes(filtro);
    const coincidePaciente = pacientesPorMes[mes].some((p) =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.motivo.toLowerCase().includes(filtro) ||
      p.diagnostico.toLowerCase().includes(filtro) ||
      p.tratamiento.toLowerCase().includes(filtro)
    );
    return coincideMes || coincidePaciente;
  });

  return (
    <div className="principal-medico-container">
      <h2>CITAS AGENDADAS</h2>

      <input
        type="text"
        placeholder="Buscar por mes, nombre, motivo, diagnóstico o tratamiento..."
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {mesesFiltrados.length === 0 ? (
        <p className="sin-resultados">No se encontraron coincidencias.</p>
      ) : (
        mesesFiltrados.map((mes) => {
          const pacientesFiltrados = pacientesPorMes[mes].filter((p) =>
            p.nombre.toLowerCase().includes(filtro) ||
            p.motivo.toLowerCase().includes(filtro) ||
            p.diagnostico.toLowerCase().includes(filtro) ||
            p.tratamiento.toLowerCase().includes(filtro)
          );

          const mostrarPacientes = mes.toLowerCase().includes(filtro)
            ? pacientesPorMes[mes]
            : pacientesFiltrados;

          if (mostrarPacientes.length === 0) return null;

          return (
            <div key={mes} className="grupo-mes">
              <h3 className="titulo-mes">{mes.toUpperCase()}</h3>

              {mostrarPacientes.map((p) => (
                <div key={p.id} className="card-medico">
                  <h4>{p.nombre}</h4>
                  <p><strong>Motivo:</strong> {p.motivo}</p>
                  <p><strong>Fecha:</strong> {p.fecha}</p>

                  <button
                    className="btn-ver-info"
                    onClick={() =>
                      setPacienteSeleccionado(
                        pacienteSeleccionado?.id === p.id ? null : p
                      )
                    }
                  >
                    {pacienteSeleccionado?.id === p.id
                      ? "Ocultar información"
                      : "Ver información"}
                  </button>

                  {pacienteSeleccionado?.id === p.id && (
                    <div className="info-paciente">
                      <p><strong>Edad:</strong> {p.edad} años</p>
                      <p><strong>Síntomas:</strong> {p.sintomas}</p>
                      <p><strong>Diagnóstico:</strong> {p.diagnostico}</p>
                      <p><strong>Tratamiento:</strong> {p.tratamiento}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}









