import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import DefinitionCard from "./DefinitionCard";
import SolutionCard from "./SolutionCard";

function Ejercicio(props) {
  
    return (

        <div class="row" style={{marginInline: "auto"}}>
            <DefinitionCard data={props.data}></DefinitionCard>
            <SolutionCard data={props.data}></SolutionCard>
        </div>
  
    );
}
export default Ejercicio;
