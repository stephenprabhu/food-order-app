import React,{useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const[btnIsHighlighted,setBtnIsHighlighted ]=useState(false);
    const context = useContext(CartContext);
    const {items}=context;
    const numberOfCartItems = items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0);

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump:''}`;

    useEffect(()=>{
        if(context.items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);
        return ()=>{
            clearTimeout(timer);
        }
    },[items]);


    const onClickHandler=()=>{
        props.onCartButtonClick();
    }
    return (
        <button onClick={onClickHandler} className={btnClasses}>
            <span className={styles.icon}> <CartIcon /> </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
