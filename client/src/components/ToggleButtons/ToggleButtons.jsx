import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDogsFiltered } from '../../actions';
import './ToggleButtons.css'

const ToggleButtons = (props) => {

    let dog = useSelector(state => state.dogs);
    let filteredDogs = useSelector(state => state.filteredDogs);
    const dispatch = useDispatch();
    
    let dogs = filteredDogs.length !== 0 ? filteredDogs : dog;

    const [toggle, setToggle] = React.useState(true);

    (function(){
        if(dogs[0] && dogs[0].id !== "notFound") {
            for (let i = 0; i < dogs.length; i++) {
                dogs[i].sum = (parseInt(dogs[i].weight.split(' - ')[0]) +  
                    parseInt(dogs[i].weight.split(' - ')[1]) / 2);
            };
        };
    })();

    function toggleDogs(prop) {
        
        if(!toggle) {
            dogs = dogs.sort(
                function (a, b) {
                    if (a[prop] > b[prop]) return 1;
                    if (a[prop] < b[prop]) return -1;
                    return 0;
                }, prop);
            setToggle(true);
        } else {
            dogs = dogs.sort(
                function (a, b) {
                    if (a[prop] > b[prop]) return -1;
                    if (a[prop] < b[prop]) return 1;
                    return 0;
                }, prop);
            setToggle(false);
        };
        props.order === true ? props.setOrder(false) : props.setOrder(true);
        return dogs;
    };
    
    function handleChange(event) {
        let dogsData = [];
        if(event.target.value === 'az') dogsData = toggleDogs('name');
        else dogsData = toggleDogs('sum');
        dispatch(addDogsFiltered(dogsData));
    };

    return(
        <div className='toggles'>
           <label className="switchBtn">
                <input type="checkbox" value ='az' onChange={ handleChange }/>
                <div className="slide">Sort A to Z</div>
            </label>
            <label className="switchBtn">
                <input type="checkbox" value = 'kg' onChange={ handleChange }/>
                <div className="slide">Sort by weight</div>
            </label> 
        </div>
           
    );
};

export default ToggleButtons;
