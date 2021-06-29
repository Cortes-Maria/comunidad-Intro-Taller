import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SolutionCard(props) {
  return (
    <div class="col-sm-6">
      <div class="card" style={{ margin: "20px" }}>
        <div class="card-header">Solución</div>
        <div class="card-body">
          <h5 class="card-title">Call</h5>
          <p class="card-text" style={{ fontWeight: "bolder", color: "green" }}>
            Entradas:
          </p>
          {props.data.solution.inputs.map((item) => (
            <div style={{ display: "flex" }}>
              <pre>
                <span
                  class="card-text"
                  style={{ fontWeight: "bolder", color: "black" }}
                >
                  {item.name}:&nbsp;
                </span>
                <span class="card-text" style={{ color: "black" }}>
                  {item.type}
                </span>
              </pre>
            </div>
          ))}
          <p class="card-text" style={{ fontWeight: "bolder", color: "red" }}>
            Salidas:
          </p>
          {props.data.solution.outputs.map((item) => (
            <div style={{ display: "flex" }}>
              <pre>
                <span
                  class="card-text"
                  style={{ fontWeight: "bolder", color: "black" }}
                >
                  {item.name}:&nbsp;
                </span>
                <span class="card-text" style={{ color: "black" }}>
                  {item.type}
                </span>
              </pre>
            </div>
          ))}
          <hr></hr>

          <div
            class="card-text"
            style={{ backgroundColor: "lightgray", color: "black" }}
          >
            <samp>
              <pre>{props.data.solution.code}</pre>
            </samp>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SolutionCard;
