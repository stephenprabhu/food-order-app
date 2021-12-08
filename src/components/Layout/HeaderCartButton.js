import React,{useContext} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const context = useContext(CartContext);
    const numberOfCartItems = context.items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0)

    const onClickHandler=()=>{
        props.onCartButtonClick();
    }
    return (
        <button onClick={onClickHandler} className={styles.button}>
            <span className={styles.icon}> <CartIcon /> </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
