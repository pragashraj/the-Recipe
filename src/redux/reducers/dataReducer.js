const INITIAL_STATE={
    data:[]
}

const dataReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "STORE_BASKET_ITEMS":return{
            ...state,
            data:[...state.data,action.payload]
        }

        case "REMOVE_ITEM":return{
            ...state,
            data:state.data.filter(item=>item.id!==action.payload)
        }

        case "REMOVE_ALL":return{
            ...state,
            data:[]
        }

        default : return state
    }
}

export default dataReducer