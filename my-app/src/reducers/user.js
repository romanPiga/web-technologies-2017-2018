const initialState = [];

export default function user(state = initialState, action){
    if(action.type === 'CHANGE_USER'){
            return action.payload;
    }
    return state;
};