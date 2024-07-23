import { Component } from 'react'

import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import './index.css'


class CartSummary extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const { cartList, removeAllCartItems } = value
          let total = 0
          cartList.forEach(eachItem => {
            total += eachItem.cost * eachItem.quantity
          })

          const onClickRemoveCartItems = () => {
            removeAllCartItems()
          }


          return (
            <div className="cartSummary-container">
              <div className="total-container">
                <h1 className="order-total">Order Total:</h1>
                <h1 className="total">₹ {total}/-</h1>
              </div>
              <p className="items-count">{cartList.length} items in cart</p>
              <Link to="/orderSuccess" className="link">
                <button type="button" className="placeOrder-button" onClick={onClickRemoveCartItems}>
                  Place Order
                </button>
              </Link>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}


export default CartSummary