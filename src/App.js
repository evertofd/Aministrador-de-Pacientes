import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Forlumario";
import Cita from "./components/Cita";
function App() {
  //Citas en localStorage
  let citasInciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasInciales) {
    citasInciales = [];
  }

  //Arreglo de todas las citas
  const [citas, setCitas] = useState(citasInciales);

  //Funciones que modifique las citas

  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  useEffect(() => {
    if (citasInciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasInciales]);

  //Funcion que elimina una cita por su id

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  const titulo = citas.length === 0 ? "No hay Citas" : "Administra tus Citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
