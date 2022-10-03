import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDogsFiltered } from '../../actions';
import './TemperamentsSelect.css';

let prevTemp = [];
let dogsTemp = [];

const TemperamentsSelect = () => {

    const temperaments = useSelector(state => state.temperaments);
    let dogs = useSelector(state => state.dogs);
    let filteredDogs = useSelector(state => state.filteredDogs);
    const [checkbox, setCheckbox] = React.useState({expanded: false, className: 'hide'});
    const dispatch = useDispatch();
    

    function handleChange(event) {

        let filtered = filteredDogs.length !== 0 ? filteredDogs : dogs;
    
            if(event.target.checked) {
                prevTemp.push(event.target.value);
                dogsTemp = filtered.filter(d => d.temperaments && d.temperaments.includes(event.target.value));
                if(dogsTemp.length === 0) {
                    event.target.checked = false;
                    prevTemp.pop()
                    alert('no matchs for that filters');
                } else {
                    dispatch(addDogsFiltered(dogsTemp));
                };
            } else {
                dogsTemp = dogs;
                prevTemp = prevTemp.filter(t => t !== event.target.value);
                for (let i = 0; i < prevTemp.length; i++) { //eslint-disable-next-line
                    dogsTemp = dogsTemp.filter(d => d.temperaments &&
                        d.temperaments.includes(prevTemp[i]));
                };
                dispatch(addDogsFiltered(dogsTemp));
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
                        <input type = 'checkbox' id={temp} value={temp} onChange={ handleChange }/>
                        <label htmlFor={temp} className='label'>{temp}</label>
                    </div>)}
                </div>
            </div>
        </form>
    );
};

export default TemperamentsSelect;

