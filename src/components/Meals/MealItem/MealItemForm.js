import React, {useRef, useState} from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const[formisValid, setFormisValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler =  event =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const amount = +enteredAmount; 
        if(enteredAmount.trim().length === 0 || amount < 1 || amount > 10){
            setFormisValid(false);
            return ; 
        }
        props.onAddToCart(amount);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
        <Input label={"amount"} 
            ref={amountInputRef}
            input={{id:"amount_"+props.id,
                type:"number",
                min:"1",
                max:"5",
                step:"1",
                defaultValue:"1",
            }}
        />            
        <button>+ Add</button>
        {!formisValid && <p>Please enter a valid amount (1-10)</p>}
        </form>
    )
}

export default MealItemForm
