import { CREATE_DOG, GET_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS } from "../actions";

const initialState = {
    dogs: [],
    dogDetail: [],
    createDog: [],
    temperaments: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_DOGS: 
            return {
                ...state,
                dogs: action.payload
            };
        
        case GET_DOG_DETAIL: 
            return {
                ...state,
                dogDetail: action.payload
            };
        
        case CREATE_DOG: 
            return {
                ...state,
                createDog: action.payload
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };

        default: 
            return state;

    };
};

export default rootReducer;