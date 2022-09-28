import React from 'react';
import { useSelector } from 'react-redux';
import './TemperamentsSelect.css';

let prevTemp = [];
let dogsTemp = [];

const TemperamentsSelect = (props) => {

    const temperaments = useSelector(state => state.temperaments);
    const [checkbox, setCheckbox] = React.useState({expanded: false, className: 'hide'});
    

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

    
    function showCheckboxes() {
        if (!checkbox.expanded) {
            setCheckbox({expanded: true, className:'expanded'})
        } else {
            setCheckbox({expanded: false, className:'hide'})
        };
    };
        
    return(
        <form>
            <div className="multiselect">
                <div className="selectBox" onClick={ showCheckboxes }>
                    <select>
                        <option>Select the temperaments</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
               <div className={ checkbox.className }> 
                    { temperaments && temperaments.map((temp, index) => 
                    <div key = {index} className='item'>
                        <label for={temp}>{temp}</label>
                        <input type = 'checkbox' id={temp} value={temp} onChange={ handleChange }/>
                    </div>)}
                </div>
            </div>
        </form>
    );
};

export default TemperamentsSelect;

