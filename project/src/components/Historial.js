import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Historial(props) {

  
    const [alerts,setAlerts] = useState([]);
    const [error,setError] = useState(null);
    const [isLoaded,setLoaded] = useState(false);

    const loadAlerts = () => {
        fetch("https://my-json-server.typicode.com/cortes-maria/Alerts/alerts")
            .then(res => res.json())
            .then(
            (result) => {
                setLoaded(true);
                setAlerts(result);
            },
            (error) => {
                setLoaded(true);
                setError(error);
            }
            ) 
    }

    useEffect(()=>{
        loadAlerts();
    },[])

	var defaultPlace = "" ;

    var place = "";

    function checkUserZones(zoneStr) {
       return zoneStr === place;
    }

        if(props.location.historyProps !== undefined){
           place = props.location.historyProps.place;
        }else {
            place = defaultPlace;
        }

        return (
            error ?
            <p>Error: {error.message}</p>
            :
            !isLoaded ?
            <p>Loading...</p>
            : 
            <div>
                <h1 className="text-center" style={{marginTop: 20}}>Historial</h1>
                <div className="row">
                    {
                        alerts.map((u,i) => (

                            checkUserZones(u.place) ? 
                    
                            <div className="col-md-4 p-2" key={u.place}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-center">{u.disaster}</h5>
                                        <p className="text-center">{u.place}</p>
                                        <div className="row">
                                            <div className="col-sm">
                                                <p className="text-center">{u.dateTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        ))
                    }

                </div>

            </div>

        )
}
export default Historial;

