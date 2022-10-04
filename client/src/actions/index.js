const axios = require('axios');

export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ADD_DOGS_FILTERED = 'ADD_DOGS_FILTERED'
export const ADD_DOG_FAVORITE = 'ADD_DOG_FAVORITE';
export const REMOVE_DOG_FAVORITE ='REMOVE_DOG_FAVORITE';

export function getDogs(name) {
    return function(dispatch) {
        if(name) {
            return (axios(`/dogs?name=${name}`)
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_DOGS,
                    payload: data
                });
            })
            .catch(e => alert('500: The dogs could not be loaded')));
        } else {
            return (axios('/dogs')
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
        return (axios(`/dogs/${id}`)
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

export function getTemperaments() {
    return function(dispatch) {
        return (axios('/temperaments'))
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

export function addDogsFiltered(payload) {
    return {
        type: ADD_DOGS_FILTERED,
        payload
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
