import React from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';

const Cart = (props) => {

    const onCloseButtonHandler=()=>{
        props.onCloseButtonClick();
    }
    const cartItems = [{id:'c1', name:'Sushi', amount:2, price: 12.99}].map(
        item => <li>{item.name}</li>
    );
    return (
        <Modal onClick={onCloseButtonHandler}>
            <ul className={styles['cart-items']}>
                {cartItems}
            </ul>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={styles.actions}>
                <button onClick={onCloseButtonHandler} className={styles['button--alt']}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart
