import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'

   var zones = [{
        "name": "Parrita",
        "isInterested": false
      },
      {
        "name": "San José Centro",
        "isInterested": false
      },
      {
        "name": "Alajuela",
        "isInterested": false
      },
      {
        "name": "Grecia",
        "isInterested": false
      },
      {
        "name": "Puriscal",
        "isInterested": false
      },
      {
        "name": "Desamparados",
        "isInterested": false
      },
      {
        "name": "Liberia",
        "isInterested": false
      },
      {
        "name": "Siquirres",
        "isInterested": false
      }
      ] 

    function updateZones(zoneStr){
        var i;
        for(i=0; i<zones.length; i++){
            if(zones[i].name === zoneStr){
                zones[i].isInterested = !zones[i].isInterested;
            }
        }
    }

    function changeState(state){
        if(state)
            return false;
        else
            return true;
    }
    
function Zonas (){
    const [isPressed, setisPressed] = useState(false);
        return (
            <div>
                <div className="row">
                    {
                        zones.map((u,i) => (
                            u.isInterested ? 
                            <div className="col-md-4 p-2" key={u.name}>
                                <div className="card" style={{backgroundColor: 'green'}}>
                                    <div className="card-body">
                                        <button className="btn" type="button" onClick={() => {updateZones(u.name);     setisPressed(changeState(isPressed));}}>
                                            <h5 className="text-center">{u.name}</h5>
                                        </button>   
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-md-4 p-2" key={u.name}>
                                <div className="card">
                                    <div className="card-body">
                                        <button className="btn" type="button" onClick={() => {updateZones(u.name);     setisPressed(changeState(isPressed));}}>
                                            <h5 className="text-center">{u.name}</h5>
                                        </button>   
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
                <Link className="nav-link" to={{
                                                pathname: '/alertas',
                                                alertsProps: {
                                                    zones: zones
                                                }
                                            }} onClick={()=>{localStorage.setItem('zones',zones)}}>
                    <h5 className="text-center">Guardar cambios</h5>
                </Link>
            </div>
        )
}
export default Zonas;


