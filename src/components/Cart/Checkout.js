import styles from './Checkout.module.css';
import {useRef, useState} from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value=> value.trim().length >= 5;
const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = event =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet); 
        const enteredPostalIsValid = isFiveChars(enteredPostal); 
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        });

        const formIsValid  =  enteredNameIsValid &&enteredStreetIsValid  && enteredPostalIsValid &&enteredCityIsValid ;
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        });
    }
    const nameControlClasses =`${styles.control} ${formInputsValidity.name ? '': styles.invalid}`;
    const streetControlClasses =`${styles.control} ${formInputsValidity.street ? '': styles.invalid}`;
    const postalControlClasses =`${styles.control} ${formInputsValidity.postalCode ? '': styles.invalid}`;
    const cityControlClasses =`${styles.control} ${formInputsValidity.city ? '': styles.invalid}`;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Name Field Cannot Be Empty</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Street Field Cannot Be Empty</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postalCode && <p>Please Enter A Valid Postal Code. (Atleast 5 characters)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>City Field Cannot Be Empty</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm Order</button>
      </div>
    </form>
    )
}

export default Checkout;
