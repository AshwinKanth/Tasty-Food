import React from 'react'

import CartItem from '../CartItem'
import AppContext from '../../Context/AppContext'
import "./index.css"

const CartListView = () => (
    <AppContext.Consumer>
        {value =>{
            const {cartList} = value

            return(
                <ul className='cart-list'>
                    {cartList.map(eachCartItem =>(
                        <CartItem  key={eachCartItem.id} cartItemDetails={eachCartItem} />
                    ))}
                </ul>
            )
        }}
    </AppContext.Consumer>
  )

export default CartListView