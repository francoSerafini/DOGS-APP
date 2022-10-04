const validateBreed = function(value, error, setError, values, setValues) {
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

const validateWeightMin = function(value, error, setError, values, setValues) {
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

const validateWeighMax = function(value, error, setError, values, setValues) {
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

const validateHeightMin = function(value, error, setError, values, setValues) {
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

const validateHeightMax = function(value, error, setError, values, setValues) {
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

const validateLifeSpanMin = function(value, error, setError, values, setValues) {
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

const validateLifeSpanMax = function(value, error, setError, values, setValues) {
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

const validateImage = function(value, error, setError, values, setValues) {
    if(value && !/\.(jpg|jpeg|png|webp|avif|gif)$/.test(value)) {
        setError({...error, errorImage: 'Wrong url'});
    } else {
        setError({...error, errorImage: ''});
    };
    setValues({...values, image: value});
};

export { 
   validateBreed,
   validateHeightMin,
   validateHeightMax,
   validateWeightMin,
   validateWeighMax,
   validateLifeSpanMin,
   validateLifeSpanMax,
   validateImage
};
