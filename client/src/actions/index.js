const axios = require('axios');

export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';

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
            }));
        }
        else {
            return (axios('http://localhost:3001/dogs')
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_DOGS,
                    payload: data
                });
            }));
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
        }));
    };
};

export function create_dogs(data) {
    return function(dispatch) {
        return (axios.post('http://localhost:3001/dogs', data)
        .then(data => {
            dispatch({
                type: CREATE_DOG,
                payload: data
            });
        }));
    };
};
