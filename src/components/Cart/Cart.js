import React, {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout]= useState(false);
    const [isSubmitting, setIsSubmitting]= useState(false);
    const [orderSubmitted, setOrderSubmitted]= useState(false);

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

    const orderHandler = () =>{
        setIsCheckout(true);
    }

    const submitOrderhandler = async(userData)=>{
        setIsSubmitting(true);
        const res = await fetch("https://stock-market-2d727-default-rtdb.firebaseio.com/orders.json",{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: ctx.items
            })
        });
        setIsSubmitting(false);
        setOrderSubmitted(true);
        ctx.clearCart();
    }

    const modalActions =  <div className={styles.actions}>
    <button onClick={onCloseButtonHandler} className={styles['button--alt']}>Close</button>
    {ctx.items.length>0 && <button className={styles.button} onClick={orderHandler}>Order</button> }
</div>;

const cartModalContent = <> <ul className={styles['cart-items']}>
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
{isCheckout && <Checkout onCancel={onCloseButtonHandler} onConfirm={submitOrderhandler} />}
{!isCheckout && modalActions}</>

const isSubmittingModalContent = <p>Letting the Chefs know to put on thier hats....</p>;
const didSubmitModalContent = <><p>Successfully sent the order!</p><div className={styles.actions}>
<button onClick={onCloseButtonHandler} className={styles.button}>Close</button>
</div></>;

    return (
        <Modal onClick={onCloseButtonHandler}>
           {!isSubmitting && !orderSubmitted && cartModalContent}
           {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && orderSubmitted && didSubmitModalContent }
        </Modal>
    )
}

export default Cart
