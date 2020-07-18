export const storeData=data=>({
    type:"STORE_BASKET_ITEMS",
    payload:data
})

export const removeAnItem=item=>({
    type:"REMOVE_ITEM",
    payload:item
})

export const removeAll=()=>({
    type:"REMOVE_ALL"
})