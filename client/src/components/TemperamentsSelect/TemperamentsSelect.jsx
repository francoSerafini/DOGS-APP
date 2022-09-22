import React from 'react';
import { useSelector } from 'react-redux';

let prevTemp = [];
let dogsTemp = [];

const TemperamentsSelect = (props) => {

    const temperaments = useSelector(state => state.temperaments);
    

    function handleChange(event) {

        let filtered = props.states.filteredDogs.length !== 0 ?
            props.states.filteredDogs : props.dogs;
    
            if(event.target.checked) {
                prevTemp.push(event.target.value);
                dogsTemp = filtered.filter(d => d.temperaments && d.temperaments.includes(event.target.value));
                if(dogsTemp.length === 0) {
                    event.target.checked = false;
                    prevTemp.pop()
                    alert('no matchs for that filters');
                } else {
                    props.setStates({
                        ...props.states,
                        filteredDogs: dogsTemp
                    });
                };
            } else {
                dogsTemp = props.dogs;
                prevTemp = prevTemp.filter(t => t !== event.target.value);
                for (let i = 0; i < prevTemp.length; i++) { //eslint-disable-next-line
                    dogsTemp = dogsTemp.filter(d => d.temperaments &&
                        d.temperaments.includes(prevTemp[i]));
                };
                props.setStates({
                    ...props.states,
                    filteredDogs: dogsTemp
                });
            };
        };
        
    return(
        <div>
            { temperaments && temperaments.map((temp, index) => 
                <div key = {index}>
                    <input type = 'checkbox' value= {temp} onChange={ handleChange }/>
                        <label>{temp}</label>
                </div>)}
        </div>
     
    );
};

export default TemperamentsSelect;