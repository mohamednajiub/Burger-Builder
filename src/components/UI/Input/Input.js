import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    console.log(props.elementConfig.config.touched);
    let label = null,
        element = null,
        inputClasses = [classes.InputElement];

    if(!props.elementConfig.config.valid && props.elementConfig.config.validation && props.elementConfig.config.touched){
        inputClasses.push(classes.Invalid);
    }else{
        inputClasses.push(classes.Valid);
    }
    if(props.elementConfig.config.labelName){
        label = <label className={classes.Label} htmlFor={props.id}>{props.elementConfig.config.labelName}</label>
    }
    if (props.elementConfig){
        if (props.elementConfig.config.elementConfig.options){
            element = 
            <>
                <input list={props.elementConfig.id} placeholder={props.elementConfig.config.elementConfig.placeholder} className={inputClasses.join(' ')} value={props.elementConfig.config.value} onChange={props.changed}/>
                <datalist id={props.elementConfig.id} >
                {props.elementConfig.config.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}/>
                ))}
                    
                </datalist>
            </>
        } else {
            element = <input className={inputClasses.join(' ')} {...props.elementConfig.config.elementConfig}  value={props.elementConfig.config.value} onChange={props.changed}/>
        }
    }
    return (
        <div className={classes.Input}>
            {label}
            {element}
        </div>
    )
}
export default input;