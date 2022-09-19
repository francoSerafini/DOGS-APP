import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createDogs } from "../../actions";

const CreateDog = () => {

    const dispatch = useDispatch();
    const [breedName, setBreedname] = useState('');
    const [weightMin, setWeightMin] = useState('');
    const [weightMax, setWeightMax] = useState('');
    const [heightMin, setHeightMin] = useState('');
    const [heightMax, setHeightMax] = useState('');
    const [lifeSpanMin, setLifeSpanMin] = useState('');
    const [lifeSpanMax, setLifeSpanMax] = useState('');
    const [image, setImage] = useState('');
    const [errorBreed, setErrorBreed] = useState('');
    const [errorWeightMin, setErrorWeightMin] = useState('');
    const [errorWeightMax, setErrorWeightMax] = useState('');
    const [errorHeightMin, setErrorHeightMin] = useState('');
    const [errorHeightMax, setErrorHeightMax] = useState('');
    const [errorLifeSpanMin, setErrorLifeSpanMin] = useState('');
    const [errorLifeSpanMax, setErrorLifeSpanMax] = useState('');
    const [errorImage, setErrorImage] = useState('');


    function validateBreed(value) {
        if(value && (!/^[A-Za-z]+$/.test(value))) {
            setErrorBreed('No numbers or special character allowed');
        } else if(value && value.length > 15) {
            setErrorBreed('Maximum 15 characters');
        } else {
            setErrorBreed('');
        };
        setBreedname(value);
    };

    function validateWeightMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorWeightMin('Only intergers numbers');
        } else if(value && value < 1) {
            setErrorWeightMin('Min 1Kg');
        } else if(value && value > 60) {
            setErrorWeightMin('Max 60Kg');
        } else {
            setErrorWeightMin('');
        };
        setWeightMin(value);
    };

    function validateWeighMax(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorWeightMax('Only intergers numbers');
        } else if(value && value > 90) {
            setErrorWeightMax('Max 90Kg');
        } else if(value && weightMin >= value){
            setErrorWeightMax(`Only numbers greater than ${weightMin}`);
        } else {
            setErrorWeightMax('');
        };
        setWeightMax(value);
    };

    function validateHeightMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorHeightMin('Only intergers numbers');
        } else if(value && value < 10) {
            setErrorHeightMin('Min 10Cm');
        } else if(value && value > 105) {
            setErrorHeightMin('Max 90Cm');
        } else {
            setErrorHeightMin('');
        };
        setHeightMin(value);
    };

    function validateHeightMax(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorHeightMax('Only intergers numbers');
        } else if(value && value > 105) {
            setErrorHeightMax('Max 105Cm');
        } else if(value && heightMin >= value){
            setErrorHeightMax(`Only numbers greater than ${heightMin}`);
        } else {
            setErrorHeightMax('');
        };
        setHeightMax(value);
    };

    function validateLifeSpanMin(value) {
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorLifeSpanMin('Only intergers numbers');
        } else if(value && value < 8) {
            setErrorLifeSpanMin('Min 8 yerars');
        } else if(value && value > 20) {
            setErrorLifeSpanMin('Max 12 years');
        } else {
            setErrorLifeSpanMin('');
        };
        setLifeSpanMin(value);
    };

    function validateLifeSpanMax(value) {
        console.log(value && lifeSpanMin >= value)
        if(value && (isNaN(value) || value % 1 !== 0)) {
            setErrorLifeSpanMax('Only intergers numbers');
        } else if(value && value > 20) {
            setErrorLifeSpanMax('Max 20 years');
        } else if(value && lifeSpanMin >= value){
            setErrorLifeSpanMax(`Only numbers greater than ${lifeSpanMin}`);
        } else {
            setErrorLifeSpanMax('');
        };
        setLifeSpanMax(value);
    };

    function validateImage(value) {
        if(value && !/\.(jpg|jpeg|png|webp|avif|gif)$/.test(value)) {
            setErrorImage('Wrong url');
        } else {
            setErrorImage('');
        };
        setImage(value);
    };

    function formError() {
       return !(errorBreed || errorHeightMin || errorHeightMax || errorWeightMin ||
            errorWeightMax || errorLifeSpanMin || errorLifeSpanMax || errorImage
            || !breedName || !heightMin || !heightMax || !weightMin || !weightMax)};

    function handleSubmit(e) {
        const height = heightMin + ' - ' + heightMax;
        const weight = weightMin + ' - ' + weightMax;
        const lifeSpan = lifeSpanMin + ' - ' + lifeSpanMax;
        e.preventDefault();
        if(formError()) //aca me quede
        dispatch(createDogs({
            name: breedName,
            height: height,
            weight: weight,
            life_span: lifeSpan,
            image: image
        }));
    };
    

    return(
        <form onSubmit={ handleSubmit }>  
            <input type="text" name="breedName" value={breedName} placeholder="Breed Name" onChange={(e) => validateBreed(e.target.value)}/>
            {!errorBreed ? null : <span>{errorBreed}</span>}
            <input type="text" name="weightMin" value={weightMin} placeholder="Weight Min" onChange={(e) => validateWeightMin(e.target.value)}/>
            {!errorWeightMin ? null : <span>{errorWeightMin}</span>}
            {weightMin ? <input type="text" name="weightMax" value={weightMax} placeholder="Weight Max" onChange={(e) => validateWeighMax(e.target.value)}/> :
                <input name="weightMax" disabled="true" placeholder="Weight Max"/>} 
            {!errorWeightMax ? null : <span>{errorWeightMax}</span>}
            <input type="text" name="heightMin" value={heightMin} placeholder="Height Min" onChange={(e) => validateHeightMin(e.target.value)}/>
            {!errorHeightMin ? null : <span>{errorHeightMin}</span>}
            {heightMin ? <input type="text" name="heightMax" value={heightMax} placeholder="Height Max" onChange={(e) => validateHeightMax(e.target.value)}/> :
                <input name="heightMax" disabled="true" placeholder="Height Max"/>}
            {!errorHeightMax ? null : <span>{errorHeightMax}</span>}
            <input type="text" name="lifeSpanMin" value={lifeSpanMin} placeholder="Life Span Min" onChange={(e) => validateLifeSpanMin(e.target.value)}/>
            {!errorLifeSpanMin ? null : <span>{errorLifeSpanMin}</span>}
            {lifeSpanMin ? <input type="text" name="lifeSpanMax" value={lifeSpanMax} placeholder="Life Span Max" onChange={(e) => validateLifeSpanMax(e.target.value)}/> :
                <input name="lifeSpanMax" disabled="true" placeholder="Life Span Max"/>}
            {!errorLifeSpanMax ? null : <span>{errorLifeSpanMax}</span>}
            <input type="text" name="image" value={image} placeholder="Image Url" onChange={(e) => validateImage(e.target.value)}/>
            {!errorImage ? null : <span>{errorImage}</span>}
            <input type="submit" value="Submit"/>
        </form>
    )
};

export default CreateDog;