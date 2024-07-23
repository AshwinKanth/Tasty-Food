import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import AppContext from '../../Context/AppContext'
import "./index.css"

const Cart = () => (
  <AppContext.Consumer>
    {value =>{
      const {cartList} = value

      const showEmptyView = cartList.length === 0

      return(
        <>
        <Header />
        <div className='cart-container'>
           {showEmptyView ? (
              <div className="cart-empty-view-container">
              <img
                src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1721198787/cooking_1_rt1yls.png"
                className="cart-empty-img"
                alt="cart empty"
              />
              <h1 className="cart-empty-heading">No Orders Yet</h1>
            <p>Your cart is empty. Add something from the menu.</p>
              <Link to="/" className="link">
                <button type="button" className="shop-now-btn">
                  Order Now
                </button>
              </Link>
            </div>
           ):(
            <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                <hr className='hrBreak'/>
                <CartSummary />
              </div>
           )}
        </div>
    </>
      )
    }}
  </AppContext.Consumer>
)

export default Cart