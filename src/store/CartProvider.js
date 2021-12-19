import React, {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const CartReducer=(state, action)=>{
    if (action.type === 'ADD_ITEM'){
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
            (item)=> item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
           const updatedItem={
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems= [...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item)=> item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const newTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
           updatedItems = state.items.filter((item)=> item.id !== existingCartItem.id);
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if(action.type ==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = (props) => {
   const [cartState, dispathCartAction] = useReducer(CartReducer, defaultCartState);

    const addItemToCartHandler = item =>{
        dispathCartAction({
            type:'ADD_ITEM',
            item: item
        });
    }
    const removeItemFromCartHandler = id =>{
        dispathCartAction({
            type:'REMOVE_ITEM',
            id: id
        });
    }
    const clearCartHandler = id =>{
        dispathCartAction({
            type:'CLEAR',
        });
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;
