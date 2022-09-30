const axios = require('axios');

export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ADD_DOG_FAVORITE = 'ADD_DOG_FAVORITE';
export const REMOVE_DOG_FAVORITE ='REMOVE_DOG_FAVORITE';

export function getDogs(name) {
    return function(dispatch) {
        if(name) {
            return (axios(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_DOGS,
                    payload: data
                });
            })
            .catch(e => alert('500: The dogs could not be loaded')));
        } else {
            return (axios('http://localhost:3001/dogs')
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_DOGS,
                    payload: data
                });
            })
            .catch(e => alert('ERROR 500: The dogs could not be loaded')));
        };
    };
};
    
export function getDogDetail(id) {
    return function(dispatch) {
        return (axios(`http://localhost:3001/dogs/${id}`)
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: GET_DOG_DETAIL,
                payload: data
            });
        })
        .catch(e => alert('ERROR 404: Dog Not Found')));
    };
};

export function createDogs(data) {
    return function(dispatch) {
        return (axios.post('http://localhost:3001/dogs', data)
        .then(data => {
            dispatch({
                type: CREATE_DOG,
                payload: data
            });
            return alert('Breed created successfull')
        })
        .catch(e => alert('ERROR 400: Not created: ' + e.response.data)));
    };
};

export function getTemperaments() {
    return function(dispatch) {
        return (axios('http://localhost:3001/temperaments'))
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: GET_TEMPERAMENTS, 
                payload: data
            });
        })
        .catch(e => alert('ERROR 500: Tempers could not be loaded'));
    };
};

export function addDogFavorite(payload) {
    return { 
        type: ADD_DOG_FAVORITE, 
        payload 
    };
}

export function removeDogFavorite(payload) {
    return {
        type: 'REMOVE_DOG_FAVORITE',
        payload
    };
}
