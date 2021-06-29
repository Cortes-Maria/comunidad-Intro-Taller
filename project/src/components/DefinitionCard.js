import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingPage from "./RatingButton";
import { db } from "../firebase";

function DefinitionCard(props) {

    const deleteNote = () =>{
        console.log(props.data.code.slice(-1)-1)
        db.ref(`/${props.data.code.slice(-1)-1}`).remove();
        setToggle(!toggle)
    }

    const [toggle, setToggle] = useState(true)


  return (
    <div class="col-sm-6">
      <div class="card" style={{ margin: "20px" }}>
        <div class="card-header">   
            
            {
                props.isAdmin ?
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <p style={{alignSelf: "flex-end"}}>Definición</p>
                <button type="button" class="btn btn-secondary" onClick={deleteNote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                    </svg>
                </button>
                </div>
                :
                "Definición"
            }
        </div>
      
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
