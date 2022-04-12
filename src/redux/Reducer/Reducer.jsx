const initialState = {
    users:[],
    user: {},
    loading:false
}

const userReducers = (state = initialState, action)=>{
    switch (action.type){
        case "GET_USERS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "ADD_USER":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "DELETE_USER":
            return {
                ...state,
                loading: false,
            };
        case "MULTIPLE_DELETE":
            return{
                ...state,
                loading: false,
            }
        default:
            return state;

    }
}
export default userReducers;