import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component{
    state = {
        controls: {
            email: {
                labelName: 'E-Mail',
                elementConfig: {
                    type: 'email',
                    id: 'email',
                    name: 'email',
                    placeholder: 'E-Mail',
                },
                value: '',
                validation: {
                    minLength: 5,
                    maxLength: 50,
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                labelName: 'Password',
                elementConfig: {
                    type: 'password',
                    id: 'password',
                    name: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    minLength: 8,
                    maxLength: 20,
                    required: true,
                },
                valid: false,
                touched: false
            },
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };
        this.setState({controls: updatedControls})
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementConfig={formElement}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
        
    }
}

// const mapStateToProps = state => {
//     return{

//     }
// }
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}
export default connect(null, mapDispatchToProps)(Auth);
