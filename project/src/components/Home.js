import React, { useEffect, useState } from 'react';
import Ejercicio from './Ejercicio';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      color: "white"
    },
    select: {
      borderRadius: "16px",
    }
  }));




function Home(props) {

    const [exercises, setExercises] = useState([]);

    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
      section: "Algoritmos numéricos"
    });

    useEffect(() => {
        db.ref('/').on('value', snapshot => {
            let allExercises = [];
            snapshot.forEach(snap => {
              allExercises.push(snap.val());
            });
            setExercises(allExercises)
          });
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
          section: event.target.value
        });
        
      };
  
    return (
        <div>
            <div style={{margin: "30px"}}>
                <Select
                    native
                    variant="outlined"
                    value={state.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'filled-age-native-simple',
                    }}
                    className={classes.select}
                >

                    <option style={{ color: 'black' }} value={"Algoritmos numéricos"}>Númericos</option>
                    <option style={{ color: 'black' }} value={"Árboles"}>Árboles Binarios</option>
                    <option style={{ color: 'black' }} value={"Listas, vectores y matrices"}>Listas y Matrices</option>
                </Select>
            </div>

            <div> 
            
                {
                    exercises.map((item) => (
                        <div>
                            {
                                item.section === state.section?
                                <Ejercicio isAdmin={props.isAdmin} data={item}></Ejercicio>
                                :
                                null
                            }         
                        </div>
                    ))

                }

            </div>
        </div>

    );
    
}

export default Home;