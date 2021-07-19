import { useContext, useState, useEffect } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlight] = useState(false);
    const cartCtx = useContext(CartContext)

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    const {items} = cartCtx;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlight(true);

        const timer = setTimeout(() => {
            setBtnIsHighlight(false);
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;