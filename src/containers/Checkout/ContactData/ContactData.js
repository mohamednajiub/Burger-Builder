import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                labelName: 'Full Name',
                elementConfig: {
                    type: 'text',
                    id: 'fullname',
                    name: 'fullname',
                    placeholder: 'Full Name',
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 50,
                    required: true
                },
                valid: false,
                touched: false
            },
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
                    required: true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                labelName: 'Phone Number',
                elementConfig: {
                    type: 'tel',
                    id: 'phoneNumber',
                    name: 'phoneNumber',
                    placeholder: 'Phone Number',
                },
                value: '',
                validation: {
                    minLength: 6,
                    maxLength: 15,
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                labelName: 'Choose Country',
                elementConfig: {
                    placeholder: 'Country',
                    options: [
                        {value: 'Egypt'},
                        {value: 'Sudan'},
                        {value: 'lebnon'},
                        {value: 'lybia'},
                        {value: 'france'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                labelName: 'Postal Code',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                    inputMode: "numeric",
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
        ;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForm: updatedOrderForm
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form autoComplete="on" onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementConfig={formElement}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType='Success'>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form} 
            </div>   
        );
    }
}

export default ContactData;