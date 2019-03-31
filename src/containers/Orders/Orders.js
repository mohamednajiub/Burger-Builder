import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-burger';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
class Orders extends Component {
    state={
        orders: [],
        loading: true
    }
    componentDidMount(){
        
        axios.get('/orders.json')
            .then(response=>{
                const fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
                console.log(fetchedOrders);
            }).catch(error=>{
                this.setState({
                    loading: false
                })
            })
        ;
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
                <Order />
                <Order /> 
            </div>
        )
     }
}
export default withErrorHandler(Orders, axios);