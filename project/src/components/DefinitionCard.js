import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingPage from "./RatingButton";

function DefinitionCard(props) {
  return (
    <div class="col-sm-6">
      <div class="card" style={{ margin: "20px" }}>
        <div class="card-header">Definición</div>
        <div class="card-body">
          <div style={{ display: "flex" }}>
            <h5 class="card-title">{props.data.call}</h5>
            <RatingPage></RatingPage>
          </div>
          <p class="card-text">{props.data.details}</p>
          <hr></hr>
          <p class="card-text" style={{ fontWeight: "bolder", color: "black" }}>
            Ejemplos:
          </p>
          {props.data.examples.map((example) => (
            <div>
              <div style={{ display: "flex" }}>
                <p class="card-text" style={{ color: "black" }}>
                  Llamada:&nbsp;&nbsp;{" "}
                </p>
                <pre class="card-text" style={{ color: "blue" }}>
                  {example.call}
                </pre>
              </div>
              <div style={{ display: "flex" }}>
                <p class="card-text" style={{ color: "black" }}>
                  Resultado:&nbsp;&nbsp;{" "}
                </p>
                <pre class="card-text" style={{ color: "black" }}>
                  {example.result}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DefinitionCard;
