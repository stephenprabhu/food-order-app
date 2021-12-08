import React from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';

const Backdrop = (props) =>{
    return <div onClick={props.onClick} className={styles.backdrop}></div>
}

const ModalOverlay = (props) =>{
    return <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
    </div>
}
const portalDOMElement = document.getElementById('overlay-root');
const Modal = (props) => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>,portalDOMElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalDOMElement)}

        </>
    )
}

export default Modal
