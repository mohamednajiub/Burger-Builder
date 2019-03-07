import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey=>{
        return (
            <li key={igKey}>
                <span>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        );
    })
    return (
        <>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:</strong> {props.price.toFixed(2)} </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    )
}

export default orderSummary;