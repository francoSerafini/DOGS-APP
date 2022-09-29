import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createDogs, getTemperaments } from "../../actions";
import Navbar from "../Navbar/Navbar";
import './CreateDog.css'

const CreateDog = () => {

    const dispatch = useDispatch();

    React.useEffect(() => { 
        dispatch(getTemperaments())
        .catch(err => err.message)}, [ dispatch ]);

    const temperaments = useSelector(state => state.temperaments);
   
    let selectedTemperaments = [];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [values, setValues] = useState({});
    const [error, setError] = useState({});

    function validateBreed(value) {
        if(value && (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(value))) {
            setError({...error, errorBreed: 'No numbers or special character allowed'});
        } else if(value && value.length > 20) {
            setError({...error, errorBreed: 'Maximum 15 characters'});
        } else if(value && value.split(' ').length > 2) {
            setError({...error, errorBreed: 'maximum two words'});
        } else {
            setError({...error, errorBreed: ''});
        };
        setValues({...values, breedName: value});
    };

    function validateWeightMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorWeightMin: 'The mimimum weight must be a interger number'});
        } else if(value && value < 1) {
            setError({...error, errorWeightMin: 'The minimum weight must be greater than or equal to 1Kg'});
        } else if(value && value > 60) {
            setError({...error, errorWeightMin: 'The minimum weight must be less than or equal to 60Kg'});
        } else if(value && (values.weightMax !== '' && values.weightMax <= value)) {
            setError({...error, errorWeightMin: 'The minimum weight must be greater than the maximum weight'}); 
        } else { 
            setError({...error, errorWeightMin: ''});
        };
        setValues({...values, weightMin: value});
    };

    function validateWeighMax(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorWeightMax: 'The maximum weight must be a interger number'});
        } else if(value && value > 90) {
            setError({...error, errorWeightMax: 'The maximum weight must be less than or equal to 90Kg'});
        } else if(value && (values.weightMin !== '' && values.weightMin >= value)){
            setError({...error, errorWeightMax: `The maximum weight must be greater than ${values.weightMin}Kg`});
        } else {
            setError({...error, errorWeightMax: ''});
        };
        setValues({...values, weightMax: value});
    };

    function validateHeightMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorHeightMin: 'The minimum height must be a interger number'});
        } else if(value && value < 10) {
            setError({...error, errorHeightMin: 'The minimum height must be greater than or equal to 10Cm'});
        } else if(value && value > 90) {
           setError({...error, errorHeightMin: 'The minimum height must be less than or equal to 90Cm'});
        } else if(value && (values.heightMax !== '' && values.heightMax <= value)){
            setError({...error, errorHeightMin: 'The minimum height must be greater than the maximum height'}); 
        } else {
            setError({...error, errorHeightMin: ''});
        };
        setValues({...values, heightMin: value});
    };

    function validateHeightMax(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorHeightMax: 'The maximum height must be a interger number'});
        } else if(value && value > 105) {
           setError({...error, errorHeightMax: 'The maximum height must be less than or equal to 105Cm'});
        } else if(value && (values.heightMin !== '' && values.heightMin >= value)){
            setError({...error, errorHeightMax: `The maximum height must be greater than ${values.heightMin}Cm`});
        } else {
            setError({...error, errorHeightMax: ''});
        };
        setValues({...values, heightMax: value});
    };

    function validateLifeSpanMin(value) {
        if(value && value % 1 !== 0) {
            setError({...error, errorLifeSpanMin: 'The minimum life expentancy must be a interger number'});
        } else if(value && value < 8) {
            setError({...error, errorLifeSpanMin: 'The minimum life expentancy must be greater than or equal to 8 yerars'});
        } else if(value && value > 12) {
            setError({...error, errorLifeSpanMin: 'The minimum life expentancy must be less than or equal to 12 years'});
        } else if(value && (values.lifeSpanMax !== '' && values.lifeSpanMax <= Number(value))) {
            setError({...error, errorLifeSpanMin: 'The minimum life expentancy must be greater than the maximum life expentancy'});
        } else {
            setError({...error, errorLifeSpanMin: ''});
        };
        setValues({...values, lifeSpanMin: value});
    };

    function validateLifeSpanMax(value) {
        if(value && value % 1 !== 0) {
            setError({...error, errorLifeSpanMax: 'The maximum life expentancy must be a interger number'});
        } else if(value && value > 20) {
            setError({...error, errorLifeSpanMax: 'The maximum height must be less than or equal to 20 years'});
        } else if(value && (values.lifeSpanMin !== '' && values.lifeSpanMin >= Number(value))) {
            setError({...error, errorLifeSpanMax: `The maximum height must be greater than ${values.lifeSpanMin} years`});
        } else {
            setError({...error, errorLifeSpanMax: ''});
        };
        setValues({...values, lifeSpanMax: value});
    };

    function validateImage(value) {
        if(value && !/\.(jpg|jpeg|png|webp|avif|gif)$/.test(value)) {
            setError({...error, errorImage: 'Wrong url'});
        } else {
            setError({...error, errorImage: ''});
        };
        setValues({...values, image: value});
    };
    
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
        dispatch(createDogs(newBreed));
    };
    

    return(
        <div className='createPage'>
            <Navbar/>
            <h1 className='titleCreate'>Create your own dog breed</h1>
            <form className='createForm' onSubmit={ handleSubmit }>  
                <div>
                    <h4>Name*</h4>
                    <input type="text" name="breedName" value={values.breedName || ''} placeholder=" Breed Name" onChange={(e) => validateBreed(e.target.value)}/>
                    {!error.errorBreed ? null : <h5>{error.errorBreed}</h5>}
                </div>
                <div>
                    <h4>Weight*</h4>
                    <input type="text" className="maxAndMin" value={values.weightMin || ''} placeholder=" Min" onChange={(e) => validateWeightMin(e.target.value)}/>
                    -
                    <input type="text" className="maxAndMin" value={values.weightMax || ''} placeholder=" Max" onChange={(e) => validateWeighMax(e.target.value)}/>
                    {!error.errorWeightMin ? null : <h5>{error.errorWeightMin}</h5>}
                    {!error.errorWeightMax ? null : <h5>{error.errorWeightMax}</h5>}
                </div>
                <div>
                    <h4>Height*</h4>
                    <input type="text" className="maxAndMin" value={values.heightMin || ''} placeholder=" Min" onChange={(e) => validateHeightMin(e.target.value)}/>
                    -
                    <input type="text" className="maxAndMin" value={values.heightMax || ''} placeholder=" Max" onChange={(e) => validateHeightMax(e.target.value)}/>
                    {!error.errorHeightMin ? null : <h5>{error.errorHeightMin}</h5>}
                    {!error.errorHeightMax ? null : <h5>{error.errorHeightMax}</h5>}
                </div>
                <div>
                    <h4>Life Expectancy</h4>
                    <input type="number" className="maxAndMin" value={values.lifeSpanMin || ''} placeholder="Min" onChange={(e) => validateLifeSpanMin(e.target.value)}/>
                    -
                    <input type="number" className="maxAndMin" value={values.lifeSpanMax || ''} placeholder="Max" onChange={(e) => validateLifeSpanMax(e.target.value)}/> 
                    {!error.errorLifeSpanMin ? null : <h5>{error.errorLifeSpanMin}</h5>}
                    {!error.errorLifeSpanMax ? null : <h5>{error.errorLifeSpanMax}</h5>}
                </div>
                <div>
                    <h4>Image</h4>
                    <input type="text" name="image" value={values.image || ''} placeholder=" Image Url" onChange={(e) => validateImage(e.target.value)}/>
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