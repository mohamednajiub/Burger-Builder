import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-burger';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum +el
        }, 0);
        return sum > 0;
    }
    
    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }
    render (){
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0
        }
        let orderSummary = null;
        
        let burger = this.props.error ? <p> Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purshasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice}
            />;
        }
        return(
            <>
            {
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
            }
                {burger} 
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};
export default connect (mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));