import React from 'react';
import { useSelector } from 'react-redux';

let prevTemp = [];

const TemperamentsSelect = (props) => {

    const temperaments = useSelector(state => state.temperaments);
    

    function handleChange(event) {

        let dogsTemp = [];

        let filtered = props.states.filteredDogs.length !== 0 ?
            props.states.filteredDogs : props.dogs;
            
        if(event.target.value === 'All races') {
            dogsTemp = props.dogs;
        }

        else {

            if(event.target.checked) {
                prevTemp.push(event.target.value);
                dogsTemp = filtered.filter(d => d.temperaments && d.temperaments.includes(event.target.value));
                if(dogsTemp.length === 0) {
                    dogsTemp = props.dogs;
                    alert('no matchs');
                };  
            }

            else {
                dogsTemp = props.dogs;
                prevTemp = prevTemp.filter(t => t !== event.target.value);
                //dogsTemp = filtered.filter(d => d.temperaments && !(d.temperaments.includes(event.target.value)));
                for (let i = 0; i < filtered.length; i++) {
                    for (let a = 0; a < prevTemp.length; a++) {
                        console.log(filtered[i].temperaments && filtered[i].temperaments.includes(prevTemp[a]))
                        if (filtered[i].temperaments && filtered[i].temperaments.includes(prevTemp[a])) {
                            filtered.splice(i, 1)
                        };
                    };
                    dogsTemp = filtered;
                };
            };
            console.log(dogsTemp) 
        };
             

        props.setStates({
            ...props.states,
            filteredDogs: dogsTemp
        });
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

   // <select 
        //     name='temperaments' 
        //     id = 'temp'
        //     onChange={ handleChange }>
        //         <option 
        //             key = 'All'
        //             value = 'All'>
        //             All Temperaments
        //         </option>
        //     { temperaments && temperaments.map((temp, index) =>                            
        //         <option 
        //             key = {index} 
        //             value = {temp}>
        //             {temp}
        //         </option>) }
        // </select>

export default TemperamentsSelect;