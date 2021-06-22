import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Alertas(props) {

  
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

	var defaultUserZones = [{
        "name": "Parrita",
        "isInterested": false
      },
      {
        "name": "Chepe",
        "isInterested": false
      },
      {
        "name": "Alajuela",
        "isInterested": false
    }]

    var userZones = []

    function checkUserZones(zoneStr) {
        console.log("aqui");
        console.log(userZones);
        var i;
        for (i=0; i<userZones.length; i++){
            console.log(userZones[i].name == zoneStr );
            if(userZones[i].name === zoneStr && userZones[i].isInterested){
                return true
            }
        }
        return false;
    }
    
        if(props.location.alertsProps !== undefined){
            userZones = props.location.alertsProps.zones;
            console.log("zones", props.location.alertsProps.zones);
            localStorage.setItem('zones', JSON.stringify(props.location.alertsProps.zones));
            console.log("hizo esto");
        }else {
            userZones = defaultUserZones;
            console.log("hizo lo otro");
        }

        if(localStorage.getItem('zones') !== null){
            userZones = JSON.parse(localStorage.getItem('zones'));
        }else {
            userZones = defaultUserZones;
        }

        return (
            error ?
            <p>Error: {error.message}</p>
            :
            !isLoaded ?
            <p>Loading...</p>
            : 
            <div>
                <h1 className="text-center" style={{marginTop: 20}}>Alertas Recientes</h1>
                <div className="row">
                    {
                        alerts.map((u,i) => (

                            checkUserZones(u.place) ? 
                    
                            <div className="col-md-4 p-2" key={u.place}>
                                <div className="card">
                                    <div className="card-body">
                                        <Link className="nav-link" to={{
                                                    pathname: '/history',
                                                    historyProps: {
                                                        place: u.place
                                                    }
                                                }}>
                                            <h5 className="text-center">{u.disaster}</h5>
                                        </Link>
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
export default Alertas;

