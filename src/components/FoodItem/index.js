import { Component } from "react";
import AppContext from "../../Context/AppContext"
import { FaStar } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

import "./index.css"


class FoodItem extends Component {
    state = { quantity: 0 }

    render() {
        const { foodItemDetails } = this.props
        const { name, cost, imageUrl, rating,id } = foodItemDetails
        const { quantity } = this.state

        return (
            <AppContext.Consumer>
                {value => {
                    const { addCartItems ,incrementCartItemQuantity,decrementCartItemQuantity} = value

                    const onClickAddButton = () => {
                        this.setState(
                          prevState => ({
                            quantity: prevState.quantity + 1,
                          }),
                          addCartItems({...foodItemDetails, quantity: 1}),
                        )
                      }

                   const onClickIncreaseItem = () => {
                        this.setState(prevState => ({
                            quantity: prevState.quantity + 1,
                        }))
                        incrementCartItemQuantity(id)
                    }
                
                   const onClickDecreaseItem = () => {
                        const { quantity } = this.state
                        if (quantity > 0) {
                            this.setState(prevState => ({ quantity: prevState.quantity - 1, }))
                            decrementCartItemQuantity(id)
                        }
                    }
                

                    return (
                        <li className="foodItem">
                            <img src={imageUrl} alt="name" className="foodItemImage" />
                            <div className="foodDetails">
                                <h1 className="foodName">{name}</h1>
                                <p className="foodCost">₹ {cost}</p>
                                <div className="foodRating-container">
                                    <FaStar size={15} color='#f7d707' />
                                    <p className="foodRating">{rating}</p>
                                </div>
                                {quantity === 0 ? (
                                    <button className="addButton" type="button" onClick={onClickAddButton}>ADD</button>
                                ) : (
                                    <div className="quantity-container">
                                        <button className="quantityButton" type="button"><CiCircleMinus size={15} onClick={onClickDecreaseItem} /> </button>
                                        <p className="quantity">{quantity}</p>
                                        <button className="quantityButton" type="button"><CiCirclePlus size={15} onClick={onClickIncreaseItem} /> </button>
                                 </div>

                                )}
                            </div>
                        </li>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}



export default FoodItem