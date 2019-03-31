import React from 'react';
import classes from './Order.module.css';

const order = (props) =>{
    const ingredients = [];

    for (let ingredientName in props.ingredients){
        if (props.ingredients[ingredientName] !== 0){
            ingredients.push({
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            })
        }
    }

    const ingredientOutput = ingredients.map(ig=>{
        return <li key={ig.name}>{ig.name}: ({ig.amount})</li>
    })

    return(
        <div className={classes.Order}>
            <h3>Ingredients:</h3>
            <ul>{ingredientOutput}</ul>
            <p>Price: <strong> {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
    

export default order;