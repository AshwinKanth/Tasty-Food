import React from 'react'

const AppContext = React.createContext({
    cartList: [],
    addCartItems: () =>{},
    removeCartItem: () =>{},
    removeAllCartItems: () =>{},
    incrementCartItemQuantity: () =>{},
    decrementCartItemQuantity: () =>{},
})

export default AppContext