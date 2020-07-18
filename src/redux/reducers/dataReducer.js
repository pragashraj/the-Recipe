const INITIAL_STATE={
    data:[]
}

const dataReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "STORE_BASKET_ITEMS":return{
            ...state,
            data:[...state.data,action.payload]
        }
        default : return state
    }
}

export default dataReducer