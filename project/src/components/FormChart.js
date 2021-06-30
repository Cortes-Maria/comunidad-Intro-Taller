import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase";
import "./FormChart.css";
import { element } from "prop-types";

function FormChart(props) {
  const [state, setState] = React.useState({
    call: "",
    code: "",
    created: "",
    creator: "",
    details: "",
    examples: [],
    level: "",
    name: "",
    section: "",
    solution_code: "",
    inputs: [],
    outputs: [],
  });
  const [exercises, setExercises] = useState([]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + " " + event.target.value);
  };

  const getCurrentDate = (separator = "-") => {
    let myCurrentDate = new Date();
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };

  const getCode = () => {
    db.ref("/").on("value", (snapshot) => {
      let allExercises = [];
      snapshot.forEach((snap) => {
        allExercises.push(snap.val());
      });
      setExercises(allExercises);
    });
    let max = exercises.length + 1;
    console.log(max);
    return max.toString();
  };

  //const jsonObj = "{ \"call\":"

  const addNewExercise = () => {
    const call = JSON.parse(JSON.stringify(state.call));
    const creator = JSON.parse(JSON.stringify(state.creator));
    const code = JSON.parse(JSON.stringify(getCode()));
    const level = JSON.parse(JSON.stringify(state.level));
    const created = JSON.parse(JSON.stringify(getCurrentDate()));
    const name = JSON.parse(JSON.stringify(state.name));
    const section = JSON.parse(JSON.stringify(state.section));
    const details = JSON.parse(JSON.stringify(state.details));

    console.log("Code: " + code);

    db.ref(`/${code}`)
      .set({
        call,
        creator,
        code,
        level,
        created,
        name,
        section,
        details,
      })
      .then((_) => {
        setState({
          call: "",
          code: "",
          created: "",
          creator: "",
          details: "",
          examples: [],
          level: "",
          name: "",
          section: "",
          solution_code: "",
          inputs: [],
          outputs: [],
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewExercise();
    console.log("You clicked submit.");
  };

  return props.trigger ? (
    <div className="formchart" class="card" style={{ margin: "20px" }}>
      <div class="card-header" style={{ fontWeight: "bolder", color: "black" }}>
        {" "}
        Nuevo Ejercicio
      </div>
      <div class="card-body">
        <div>
          <label class="atribute-label" for="name">
            Nombre Ejercicio:
          </label>{" "}
          <input
            class="atribute-input"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
          <label class="atribute-label" for="creator">
            Nombre Creador:
          </label>{" "}
          <input
            class="atribute-input"
            type="text"
            id="creator"
            name="creator"
            onChange={handleChange}
          />
          <label class="atribute-label" for="level">
            Nivel:
          </label>{" "}
          <input
            class="atribute-input"
            type="text"
            id="level"
            name="level"
            onChange={handleChange}
          />
        </div>
        <div>
          <label class="atribute-label" for="section">
            Sección:
          </label>{" "}
          <input
            class="atribute-input"
            type="text"
            id="section"
            name="section"
            onChange={handleChange}
          />
          <label class="atribute-label" for="call">
            Llamada:
          </label>{" "}
          <input
            class="atribute-input"
            type="text"
            id="call"
            name="call"
            onChange={handleChange}
          />
        </div>
        <div>
          <label class="atribute-label" for="details">
            Detalles:
          </label>{" "}
          <textarea
            class="text-area"
            type="textarea"
            id="details"
            name="details"
            onChange={handleChange}
          />
          <label class="atribute-label" for="solution_code">
            Código Solución:
          </label>{" "}
          <textarea
            class="text-area"
            type="textarea"
            id="solution_code"
            name="solution_code"
            onChange={handleChange}
          />
        </div>
      </div>
      <div class="card-footer">
        <form onSubmit={handleSubmit}>
          <button
            class="footer-btn"
            id="btn-cls"
            onClick={() => props.setTrigger(false)}
          >
            Close
          </button>
          <button class="footer-btn" id="btn-sub" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
export default FormChart;
