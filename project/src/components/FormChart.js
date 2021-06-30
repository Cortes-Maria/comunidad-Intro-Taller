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
    let max = 0;
    for (let i = 0; i < exercises.length; i++) {
      let x = parseInt(exercises[i].code);
      console.log(x);
      max = Math.max(x, max);
    }
    console.log(max);
    return (max + 1).toString();
  };

  const addNewExercise = () => {
    const call = state.call;
    const code = getCode();
    const created = "statecreated";
    const creator = "statecreator";
    const details = "statedetails";
    const examples = [
      {
        call: "cantidadDeDigitos(12345)",
        result: "5",
        comment: "",
      },
      {
        call: "cantidadDeDigitos(0)",
        result: "1",
        comment: "Cero tiene un digito",
      },
      {
        call: "cantidadDeDigitos(9)",
        result: "1",
        comment: "",
      },
    ];
    const level = "statelevel";
    const name = "state.name";
    const section = "statesection";
    const solution_code =
      "def cantidadDigitos (num):\n\n    if num == 0: # El 0 es una excepción\n        return 1\n    num = abs(num) #lo hace positivo siempre\n    contador = 0\n    while num > 0:\n        contador = contador + 1\n        num = num // 10\n    return contador";
    const inputs = {
      name: "num",
      type: "numero entero positivo o cero",
    };
    const outputs = {
      name: "resultado",
      type: "numero entero",
    };
    const solution = [solution_code, inputs, outputs];

    console.log(code);

    db.ref(`/${code}`)
      .push({
        call,
        code,
        created,
        creator,
        details,
        examples,
        level,
        name,
        section,
        solution,
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
