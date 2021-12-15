import React, {useContext} from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const onCloseButtonHandler=()=>{
        props.onCloseButtonClick();
    }

    const cartItemRemoveHandler = id=>{
        ctx.removeItem(id);
    }
    const cartItemAddHandler = item =>{
        ctx.addItem({...item, amount:1});
    }

    return (
        <Modal onClick={onCloseButtonHandler}>
            <ul className={styles['cart-items']}>
                {ctx.items.map(item =>(<CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} />))}
            </ul>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button onClick={onCloseButtonHandler} className={styles['button--alt']}>Close</button>
                {ctx.items.length>0 && <button className={styles.button}>Order</button> }
            </div>
        </Modal>
    )
}

export default Cart
