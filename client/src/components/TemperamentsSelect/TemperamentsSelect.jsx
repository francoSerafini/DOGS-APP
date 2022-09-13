import React from 'react';
import { useSelector } from 'react-redux';

const TemperamentsSelect = (props) => {

    const temperaments = useSelector(state => state.temperaments);

    function handleChange(event) {
        let dogsTemp = [];
        props.dispatch(props.getDogs());
        if(event.target.value === 'All races') {
            dogsTemp = props.dogs;
        }
        else {
            dogsTemp = props.dogs.filter(a => a.temperaments && a.temperaments.includes(event.target.value));
        } 
        props.setStates({
            ...props.states,
            filteredDogs: dogsTemp
        });
    };
        
    return(
        <select 
            name='temperaments' 
            id = 'temp'
            onChange={ handleChange }>
                <option 
                    key = 'All'
                    value = 'All'>
                    All races
                </option>
            { temperaments && temperaments.map((temp, index) =>                            
                <option 
                    key = {index} 
                    value = {temp}>
                    {temp}
                </option>) }
        </select>
    );
};

export default TemperamentsSelect;