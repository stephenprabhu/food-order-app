import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <>
            <header className={styles.header}>
                <h1> Tasty Meals </h1>
                <HeaderCartButton onCartButtonClick={props.onCartButtonClick} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Table Full Of Images" />
            </div>
        </>
    )
}

export default Header
