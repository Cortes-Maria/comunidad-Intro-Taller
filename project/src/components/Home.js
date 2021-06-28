import React, { useEffect, useState } from 'react';
import Ejercicio from './Ejercicio';
import { db } from '../firebase';

function Home() {

    useEffect(() => {
        db.ref('/').on('value', snapshot => {
            let allExercises = [];
            snapshot.forEach(snap => {
              allExercises.push(snap.val());
            });
            setExercises(allExercises)
          });
    });
    const [exercises, setExercises] = useState([]);
  
    return (
        <div>
            <h4 style={{ marginTop: 20 }} className="text-center">Algoritmos</h4>
                {
                     exercises.map((item) => (
                        <div>
                            <Ejercicio data={item}></Ejercicio>
                        </div>
                    ))

                }
        </div>


    );
    
}

export default Home;