import { 
    CREATE_DOG, 
    GET_DOGS, 
    GET_DOG_DETAIL, 
    GET_TEMPERAMENTS, 
    ADD_DOGS_FILTERED,
    ADD_DOG_FAVORITE, 
    REMOVE_DOG_FAVORITE 
} from "../actions";

const initialState = {
    dogs: [],
    dogDetail: [],
    createDog: [],
    filteredDogs: [],
    temperaments: [],
    favoritesDogs: []
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

        case ADD_DOGS_FILTERED:
            return {
                ...state,
                filteredDogs: action.payload
            }; 

        case ADD_DOG_FAVORITE:
            return {
                ...state,
                favoritesDogs: state.favoritesDogs.concat(action.payload)
            };
        
        case REMOVE_DOG_FAVORITE:
            return {
                ...state,
                favoritesDogs: state.favoritesDogs.filter((dog) => dog !== action.payload)
            };

        default: 
            return state;

    };
};

export default rootReducer;