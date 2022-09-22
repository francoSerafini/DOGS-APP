import React, { useState } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { createDogs, getTemperaments } from "../../actions";

const CreateDog = () => {

    const dispatch = useDispatch();

    React.useEffect(() => { 
        dispatch(getTemperaments())
        .catch(err => err.message)}, [ dispatch ]);

    const temperaments = useSelector(state => state.temperaments);
    let temp = temperaments.map(function(t) {
        return {value: t, label: t}
    });

    let selectedTemperaments = [];
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [values, setValues] = useState({});
    const [error, setError] = useState({})
    
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
            setError({...error, errorWeightMin: 'Only intergers numbers'});
        } else if(value && value < 1) {
            setError({...error, errorWeightMin: 'Min 1Kg'});
        } else if(value && value > 60) {
            setError({...error, errorWeightMin: 'Max 60Kg'});
        } else if(value && (values.weightMax !== '' && values.weightMax <= value)) {
            setError({...error, errorWeightMin: 'Only numbers lower than Weight max'}); 
        } else { 
            setError({...error, errorWeightMin: ''});
        };
        setValues({...values, weightMin: value});
    };

    function validateWeighMax(value) {
        console.log(value, values.weightMin, 'min')
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorWeightMax: 'Only intergers numbers'});
        } else if(value && value > 90) {
            setError({...error, errorWeightMax: 'Max 90Kg'});
        } else if(value && (values.weightMin !== '' && values.weightMin >= value)){
            setError({...error, errorWeightMax: `Only numbers greater than ${values.weightMin}`});
        } else {
            setError({...error, errorWeightMax: ''});
        };
        setValues({...values, weightMax: value});
    };

    function validateHeightMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorHeightMin: 'Only intergers numbers'});
        } else if(value && value < 10) {
            setError({...error, errorHeightMin: 'Min 10Cm'});
        } else if(value && value > 90) {
           setError({...error, errorHeightMin: 'Max 90Cm'});
        } else if(value && (values.heightMax !== '' && values.heightMax <= value)){
            setError({...error, errorHeightMin: `Only numbers lower than Height max`}); 
        } else {
            setError({...error, errorHeightMin: ''});
        };
        setValues({...values, heightMin: value});
    };

    function validateHeightMax(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setError({...error, errorHeightMax: 'Only intergers numbers'});
        } else if(value && value > 105) {
           setError({...error, errorHeightMax: 'Max 105Cm'});
        } else if(value && (values.heightMin !== '' && values.heightMin >= value)){
            setError({...error, errorHeightMax: `Only numbers greater than ${values.heightMin}`});
        } else {
            setError({...error, errorHeightMax: ''});
        };
        setValues({...values, heightMax: value});
    };

    function validateLifeSpanMin(value) {
        if(value && value % 1 !== 0) {
            setError({...error, errorLifeSpanMin: 'Only intergers numbers'});
        } else if(value && value < 8) {
            setError({...error, errorLifeSpanMin: 'Min 8 yerars'});
        } else if(value && value > 12) {
            setError({...error, errorLifeSpanMin: 'Max 12 years'});
        } else if(value && (values.lifeSpanMax !== '' && values.lifeSpanMax <= Number(value))) {
            setError({...error, errorLifeSpanMin: `Only numbers lower than Life Span max`});
        } else {
            setError({...error, errorLifeSpanMin: ''});
        };
        setValues({...values, lifeSpanMin: value});
    };

    function validateLifeSpanMax(value) {
        if(value && value % 1 !== 0) {
            setError({...error, errorLifeSpanMax: 'Only intergers numbers'});
        } else if(value && value > 20) {
            setError({...error, errorLifeSpanMax: 'Max 20 years'});
        } else if(value && (values.lifeSpanMin !== '' && values.lifeSpanMin >= Number(value))) {
            setError({...error, errorLifeSpanMax: `Only numbers greater than ${values.lifeSpanMin}`});
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
    
    function handleChange (selectedOption){
        setSelectedOptions(selectedOption);
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
        selectedTemperaments = selectedOptions.map(t => temperaments.indexOf(t.value) + 1);
        if(selectedTemperaments.length === 0) return alert('Select at least one temperament');
        if(formError()) {
            return alert('Error in any of the fields.');
        };
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
        dispatch(createDogs(newBreed));
        alert('Breed created successfully');
    };
    

    return(
        <form onSubmit={ handleSubmit }>  
            <input type="text" name="breedName" value={values.breedName} placeholder="Breed Name" onChange={(e) => validateBreed(e.target.value)}/>
            {!error.errorBreed ? null : <span>{error.errorBreed}</span>}
            <input type="text" name="weightMin" value={values.weightMin} placeholder="Weight Min" onChange={(e) => validateWeightMin(e.target.value)}/>
            {!error.errorWeightMin ? null : <span>{error.errorWeightMin}</span>}
            <input type="text" name="weightMax" value={values.weightMax} placeholder="Weight Max" onChange={(e) => validateWeighMax(e.target.value)}/>
            {!error.errorWeightMax ? null : <span>{error.errorWeightMax}</span>}
            <input type="text" name="heightMin" value={values.heightMin} placeholder="Height Min" onChange={(e) => validateHeightMin(e.target.value)}/>
            {!error.errorHeightMin ? null : <span>{error.errorHeightMin}</span>}
            <input type="text" name="heightMax" value={values.heightMax} placeholder="Height Max" onChange={(e) => validateHeightMax(e.target.value)}/>
            {!error.errorHeightMax ? null : <span>{error.errorHeightMax}</span>}
            <input type="number" name="lifeSpanMin" value={values.lifeSpanMin} placeholder="Life Span Min" onChange={(e) => validateLifeSpanMin(e.target.value)}/>
            {!error.errorLifeSpanMin ? null : <span>{error.errorLifeSpanMin}</span>}
            <input type="number" name="lifeSpanMax" value={values.lifeSpanMax} placeholder="Life Span Max" onChange={(e) => validateLifeSpanMax(e.target.value)}/> 
            {!error.errorLifeSpanMax ? null : <span>{error.errorLifeSpanMax}</span>}
            <input type="text" name="image" value={values.image} placeholder="Image Url" onChange={(e) => validateImage(e.target.value)}/>
            {!error.errorImage ? null : <span>{error.errorImage}</span>}
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={'Temperaments'}
                isLoading={false}
                isClearable={true}
                isSearchable={true}
                isOptionDisabled={() => selectedOptions.length >= 5}
                name="color"
                options={temp}
                isMulti
                onChange={handleChange}/>
            <input type="submit" value="Submit"/>
        </form>
    )
};

export default CreateDog;