import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Popup from 'reactjs-popup'
import AppContext from "../../Context/AppContext";
import { IoMenuSharp } from "react-icons/io5";
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'


class Header extends Component {

    onClickLogout = () => {
        Cookies.remove('jwt_token')
        const { history } = this.props
        history.replace('/login')
    }


    renderCartItemsCount = () => (
        <AppContext.Consumer>
            {value => {
                const { cartList } = value
                const cartItemsCount = cartList.length

                return (
                    <>
                        {cartItemsCount > 0 ? (
                            <span className="cart-count-badge">{cartList.length}</span>
                        ) : null}
                    </>
                )
            }}
        </AppContext.Consumer>
    )

    render() {
        const {location} = this.props
        const {pathname} = location
        const pathParts = pathname.split('/')
        const path = pathParts[1]
         const homeLinkColor = path === "" ? "linkActive" : ""
        const cartLinkColor = path === "cart" ? "linkActive" : ""
        return (
            <div className="header-container">
                <nav className="nav-container">
                    <Link to="/" className="link">
                        <img className="navImage" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720513006/TastyFood_Image_gni5dd.png" alt="" />
                    </Link>
                    <div className="navItems-container">
                        <Link to="/" className="link">
                            <p className={`${homeLinkColor} navItem`}>Home</p>
                        </Link>
                        <Link to="/cart" className="link">
                            <p className={`navItem ${cartLinkColor}`}>Cart {this.renderCartItemsCount()}</p>
                        </Link>
                        <div>
                            <Popup
                                modal
                                trigger={
                                    <button className="logOutButton navItem">Logout</button>
                                }
                            >
                                {close => (

                                    <div className="popup-container">
                                        <p className="popupDescription">Are you sure you want to sign out from Tasty Food?</p>
                                        <div>
                                            <button
                                                type="button"
                                                className="trigger-button"
                                                onClick={() => close()}
                                            >
                                                Close
                                            </button>
                                            <button className="logOutButton navItem" onClick={this.onClickLogout}>Logout</button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>

                    <div className="sm-nav-items-container">
                        <Popup
                            trigger={open => (
                                <button className="menuButton"><IoMenuSharp size={30} /></button>
                            )}
                            position="bottom right"
                            closeOnDocumentClick
                        >
                            <div className="smNav-container">
                                <Link to="/" className="link">
                                    <p className= {`${homeLinkColor} smNavItem`}>Home</p>
                                </Link>
                                <Link to="/cart" className="link">
                                    <p className={`${cartLinkColor} smNavItem`}>Cart {this.renderCartItemsCount()}</p>
                                </Link>
                                <button className="logOutButton" onClick={this.onClickLogout}>Logout</button>
                            </div>
                        </Popup>                    </div>
                </nav>
            </div>
        )
    }
}


export default withRouter(Header)
