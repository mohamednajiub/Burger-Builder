import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
// import axios from '../../../axios-burger';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];
// const controls = [];
// axios.get('ingredients.json')
// .then(response=>{
//     // controls = response.data
//     // console.log(response.data);
//     Object.keys(response.data).map(key=> {
//         return controls.push(key)
//     });
//     console.log(controls);
// }).catch(error=>{
//     console.log(error)
// })
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                Key={ctrl.label}
                label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)}
                disabeld={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purshasable}
            onClick={props.ordered}
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls