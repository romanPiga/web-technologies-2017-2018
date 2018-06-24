const initialState = [];

export default function user(state = initialState, action){
    if(action.type === 'CHANGE_REPO'){
            return action.payload;
    }
    return state;
};