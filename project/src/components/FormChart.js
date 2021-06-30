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
  const [example, setExample] = React.useState({
    call: "",
    result: "",
    comment: "",
  });

  const [input, setInput] = React.useState({
    name: "",
    type: "",
  });

  const [output, setOutput] = React.useState({
    name: "",
    type: "",
  });

  const [exercises, setExercises] = useState([]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + " " + event.target.value);
  };

  const handleChanceExample = (event) => {
    setExample({
      ...example,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + " " + event.target.value);
  };

  const handleChanceInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + " " + event.target.value);
  };

  const handleChanceOutput = (event) => {
    setOutput({
      ...output,
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

  const addNewExercise = () => {
    const call = JSON.parse(JSON.stringify(state.call));
    const creator = JSON.parse(JSON.stringify(state.creator));
    let code = JSON.parse(JSON.stringify(state.solution_code));
    const level = JSON.parse(JSON.stringify(state.level));
    const created = JSON.parse(JSON.stringify(getCurrentDate()));
    const name = JSON.parse(JSON.stringify(state.name));
    const section = JSON.parse(JSON.stringify(state.section));
    const details = JSON.parse(JSON.stringify(state.details));
    const examples = JSON.parse(JSON.stringify(state.examples));
    const inputs = JSON.parse(JSON.stringify(state.inputs));
    const outputs = JSON.parse(JSON.stringify(state.outputs));
    const solution = { outputs, code, inputs };
    code = JSON.parse(JSON.stringify(getCode()));

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
        examples,
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

  const addExample = () => {
    const call = JSON.parse(JSON.stringify(example.call));
    const result = JSON.parse(JSON.stringify(example.result));
    const comment = JSON.parse(JSON.stringify(example.comment));

    state.examples.push({ call, result, comment });

    setExample({
      call: "",
      result: "",
      comment: "",
    });
  };

  const addInput = () => {
    const name = JSON.parse(JSON.stringify(input.name));
    const type = JSON.parse(JSON.stringify(input.type));

    state.inputs.push({ name, type });

    setInput({
      name: "",
      type: "",
    });
  };

  const addOutput = () => {
    const name = JSON.parse(JSON.stringify(input.name));
    const type = JSON.parse(JSON.stringify(input.type));

    state.outputs.push({ name, type });

    setOutput({
      name: "",
      type: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewExercise();
    console.log("You clicked submit.");
  };

  const handleSubmitExample = (e) => {
    e.preventDefault();
    addExample();
    console.log("You added an example");
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    addInput();
    console.log("You added an input");
  };

  const handleSubmitOutput = (e) => {
    e.preventDefault();
    addOutput();
    console.log("You added an output");
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
            value={state.name}
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
            value={state.creator}
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
            value={state.level}
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
            value={state.section}
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
            value={state.call}
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
            value={state.details}
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
            value={state.solution_code}
            onChange={handleChange}
          />
        </div>
      </div>
      <div class="insert">
        <label class="atribute-label" for="call">
          Llamada:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="call"
          name="call"
          value={example.call}
          onChange={handleChanceExample}
        />
        <label class="atribute-label" for="result">
          Resultado:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="result"
          name="result"
          value={example.result}
          onChange={handleChanceExample}
        />
        <label class="atribute-label" for="comment">
          Commentario:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="comment"
          name="comment"
          value={example.comment}
          onChange={handleChanceExample}
        />
        <button onClick={handleSubmitExample} class="insert-btn">
          Insertar Ejemplo
        </button>
      </div>
      <div class="insert">
        <label class="atribute-label" for="name">
          Nombre:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={handleChanceInput}
        />
        <label class="atribute-label" for="type">
          Tipo:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="type"
          name="type"
          value={input.type}
          onChange={handleChanceInput}
        />
        <button onClick={handleSubmitInput} class="insert-btn">
          Insertar Input
        </button>
      </div>
      <div class="insert">
        <label class="atribute-label" for="name">
          Nombre:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="name"
          name="name"
          value={output.name}
          onChange={handleChanceInput}
        />
        <label class="atribute-label" for="type">
          Tipo:
        </label>{" "}
        <input
          class="atribute-input"
          type="text"
          id="type"
          name="type"
          value={output.type}
          onChange={handleChanceOutput}
        />
        <button onClick={handleSubmitOutput} class="insert-btn">
          Insertar Output
        </button>
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
