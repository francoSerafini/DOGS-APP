import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from "../../actions";
import Navbar from "../Navbar/Navbar";
import './CreateDog.css'
import {
    validateBreed, 
    validateHeightMin, 
    validateHeightMax, 
    validateWeightMin, 
    validateWeighMax, 
    validateLifeSpanMin,
    validateLifeSpanMax,
    validateImage
    } from './validations';

const axios = require('axios');


const CreateDog = () => {

    const dispatch = useDispatch();

    React.useEffect(() => { 
        dispatch(getTemperaments())}, [ dispatch ]);

    const temperaments = useSelector(state => state.temperaments);
   
    let selectedTemperaments = [];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [values, setValues] = useState({});
    const [error, setError] = useState({});

    function handleChange (e) {
        if(selectedOptions.length > 4) {
            return alert('Maximum 5 temperaments');
        }
        if(selectedOptions.includes(e.target.value)) {
            return alert('Temperament already selected');
        }
        else {
            setSelectedOptions([...selectedOptions, e.target.value]);
        } 
    };

    function handleClick(e) {
        setSelectedOptions(
            selectedOptions.filter( t => t !== e.target.value));
    };

    function formError() {
        return (error.errorBreed || error.errorHeightMin || error.errorHeightMax || error.errorWeightMin ||
            error.errorWeightMax || error.errorLifeSpanMin || error.errorLifeSpanMax || error.errorImage
            || !values.breedName || !values.heightMin || !values.heightMax || !values.weightMin || !values.weightMax)
        };

    function createDogs(dog) {
        axios.post('/dogs', dog)
        .then(data => alert('Breed created successfull'))
        .catch(e => alert('ERROR 400: Not created: ' + e.response.data));
    };
        

    function handleSubmit(e) {
        e.preventDefault();
        const height = values.heightMin + ' - ' + values.heightMax;
        const weight = values.weightMin + ' - ' + values.weightMax;
        const lifeSpan = values.lifeSpanMin + ' - ' + values.lifeSpanMax;
        selectedTemperaments = selectedOptions.map(t => temperaments.indexOf(t) + 1);
        if(selectedTemperaments.length === 0) return alert('Select at least one temperament');
        if(formError()) {
            return alert('Error in any of the fields.');
        };
        if((values.lifeSpanMin && !values.lifeSpanMax) || 
            (values.lifeSpanMin && !values.lifeSpanMax)) return alert('Missing data on life expectancy');
        const newBreed = {
            name: values.breedName,
        height: height,
        weight: weight,
        life_span: values.lifeSpanMin ? lifeSpan : undefined,
        image: values.image ? values.image : undefined,
        temperament: selectedTemperaments
        };
        setValues({breedName:'', weightMin:'', weightMax:'', heightMin:'', heightMax:'',
            lifeSpanMin:'', lifeSpanMax:'', image:''});    
        setSelectedOptions([]);
        createDogs(newBreed);
    }; 
    

    return(
        <div className='createPage'>
            <Navbar/>
            <h1 className='titleCreate'>Create your own dog breed</h1>
            <form className='createForm' onSubmit={ handleSubmit }>  
                <div>
                    <h4>Name*</h4>
                    <input type="text" name="breedName" value={values.breedName || ''} placeholder=" Breed Name" onChange={(e) => validateBreed(e.target.value, error, setError, values, setValues)}/>
                    {!error.errorBreed ? null : <h5>{error.errorBreed}</h5>}
                </div>
                <div>
                    <h4>Weight*</h4>
                    <input type="text" className="maxAndMin" value={values.weightMin || ''} placeholder=" Min" onChange={(e) => validateWeightMin(e.target.value, error, setError, values, setValues)}/>
                    -
                    <input type="text" className="maxAndMin" value={values.weightMax || ''} placeholder=" Max" onChange={(e) => validateWeighMax(e.target.value, error, setError, values, setValues)}/>
                    {!error.errorWeightMin ? null : <h5>{error.errorWeightMin}</h5>}
                    {!error.errorWeightMax ? null : <h5>{error.errorWeightMax}</h5>}
                </div>
                <div>
                    <h4>Height*</h4>
                    <input type="text" className="maxAndMin" value={values.heightMin || ''} placeholder=" Min" onChange={(e) => validateHeightMin(e.target.value, error, setError, values, setValues)}/>
                    -
                    <input type="text" className="maxAndMin" value={values.heightMax || ''} placeholder=" Max" onChange={(e) => validateHeightMax(e.target.value, error, setError, values, setValues)}/>
                    {!error.errorHeightMin ? null : <h5>{error.errorHeightMin}</h5>}
                    {!error.errorHeightMax ? null : <h5>{error.errorHeightMax}</h5>}
                </div>
                <div>
                    <h4>Life Expectancy</h4>
                    <input type="number" className="maxAndMin" value={values.lifeSpanMin || ''} placeholder="Min" onChange={(e) => validateLifeSpanMin(e.target.value, error, setError, values, setValues)}/>
                    -
                    <input type="number" className="maxAndMin" value={values.lifeSpanMax || ''} placeholder="Max" onChange={(e) => validateLifeSpanMax(e.target.value, error, setError, values, setValues)}/> 
                    {!error.errorLifeSpanMin ? null : <h5>{error.errorLifeSpanMin}</h5>}
                    {!error.errorLifeSpanMax ? null : <h5>{error.errorLifeSpanMax}</h5>}
                </div>
                <div>
                    <h4>Image</h4>
                    <input type="text" name="image" value={values.image || ''} placeholder=" Image Url" onChange={(e) => validateImage(e.target.value, error, setError, values, setValues)}/>
                    {!error.errorImage ? null : <h5>{error.errorImage}</h5>}
                </div>
                <h4>Select the Temperaments</h4>
                <select className="select" onChange={ handleChange }>
                    <option key='all' value='All'>Temperaments</option>
                    { temperaments && temperaments.map((temp, index) =>                            
                        <option key={index} value={temp}>{temp}</option>) }
                </select>
                <div className="selectedOptions">
                    {selectedOptions && selectedOptions.map((t, index) =>
                        <div key={index} className='option'>
                            <p>{t}</p>
                            <button type='button' className='delete' value={t} onClick={ handleClick }>x</button>
                        </div>)}
                </div>
                <input className='temperaments' type="submit" value="Create"/>
            </form>
        </div>
    );
};

export default CreateDog;