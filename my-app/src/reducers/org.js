const initialState = [];

export default function org(state = initialState, action){
    if(action.type === 'CHANGE_ORG'){
            return action.payload;
    }
    return state;
};