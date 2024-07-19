import { Route, Switch,Redirect } from 'react-router-dom'
import { Component } from 'react'
import AppContext from './Context/AppContext'
import React from 'react'
import LoginPage from './components/LoginPage'
import Home from "./components/Home"
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Cart from './components/Cart'
import OrderSuccess from './components/OrderSuccess'
import NotFound from "./components/NotFound"
import ProtectedRoute from './components/ProtectedRoute'


class App extends Component {
  state = { cartList: [] }

  addCartItems = (product) => {
    const { cartList } = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productObject.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({ cartList: updatedCartList })
    }
  }

  removeCartItem = (id) => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter(eachitem => eachitem.id !== id)
    this.setState({ cartList: updatedCartList })
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + 1
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const productObject = cartList.find(eachItem => eachItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return { ...eachItem, quantity: updatedQuantity }
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const { cartList } = this.state
    return (
      <AppContext.Provider
        value={{
          cartList, addCartItems: this.addCartItems, removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <div>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/restaurants-list/:id" component={RestaurantItemDetails} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/orderSuccess" component={OrderSuccess} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </AppContext.Provider>
    )
  }
}


// const App = () => {
//   return (
//     <Switch>
//       <Route path="/login" component={LoginPage} />
//       <ProtectedRoute exact path="/" component={Home} />
//       <ProtectedRoute eaxct path="/restaurants-list/:id" component={RestaurantItemDetails} />
//       <ProtectedRoute eaxct path="/cart" component={Cart} />
//     </Switch>
//   )
// }

export default App
