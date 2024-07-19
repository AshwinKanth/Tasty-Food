import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Popup from 'reactjs-popup'
import AppContext from "../../Context/AppContext";
import { IoSearch } from "react-icons/io5";
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
        const { searchInput } = this.props
        const onChangeSearchInput = event => {
            const { changeSearchInput } = this.props
            changeSearchInput(event.target.value)
        }

        const onEnterSearchInput = event => {
            const { enterSearchInput } = this.props
            if (event.key === 'Enter') {
                enterSearchInput()
            }
        }

        return (
            <div className="header-container">
                <nav className="nav-container">
                    <Link to="/" className="link">
                        <img className="navImage" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720513006/TastyFood_Image_gni5dd.png" alt="" />
                    </Link>
                    <div className="lgSearch-container">
                        <IoSearch size={20} />
                        <input type="search" className="searchInput" onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} placeholder="Search for Biryani, Pizza and More..." />
                    </div>
                    <div className="navItems-container">
                        <Link to="/" className="link">
                            <p className="navItem">Home</p>
                        </Link>
                        <Link to="/cart" className="link">
                            <p className="navItem">Cart {this.renderCartItemsCount()}</p>
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

                        {/* <button className="logOutButton navItem" onClick={this.onClickLogout}>Logout</button> */}
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
                                    <p className="smNavItem">Home</p>
                                </Link>
                                <Link to="/cart" className="link">
                                    <p className="smNavItem">Cart {this.renderCartItemsCount()}</p>
                                </Link>
                                <button className="logOutButton" onClick={this.onClickLogout}>Logout</button>
                            </div>
                        </Popup>
                    </div>
                </nav>
                <div className="smSearch-container">
                    <IoSearch size={20} />
                    <input type="search" className="searchInput" onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} />
                </div>
            </div>
        )
    }
}

// const Header = (props) => {

//     const onClickLogout = () => {
//         Cookies.remove('jwt_token')
//         const { history } = props
//         history.replace('/login')
//     }

//     const { searchInput } = props

//     const onEnterSearchInput = event => {
//         const { enterSearchInput } = props
//         if (event.key === 'Enter') {
//             enterSearchInput()
//         }
//     }

//     console.log(searchInput)
//     const onChangeSearchInput = event => {
//         const { changeSearchInput } = props
//         changeSearchInput(event.target.value)
//     }


//     return (
//         <div className="header-container">
//             <nav className="nav-container">
//                 <Link to="/">
//                     <img className="navImage" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720513006/TastyFood_Image_gni5dd.png" alt="" />
//                 </Link>
//                 <div className="lgSearch-container">
//                     <IoSearch size={20} />
//                     <input type="search" className="searchInput" onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput}  />
//                 </div>
//                 <div className="navItems-container">
//                     <Link to="/">
//                         <p className="navItem">Home</p>
//                     </Link>
//                     <p className="navItem">Cart</p>
//                     <button className="logOutButton navItem" onClick={onClickLogout}>Logout</button>
//                 </div>

//                 <div className="sm-nav-items-container">
//                     <Popup
//                         trigger={open => (
//                             <button className="menuButton"><IoMenuSharp size={30} /></button>
//                         )}
//                         position="bottom right"
//                         closeOnDocumentClick
//                     >
//                         <div className="smNav-container">
//                             <Link to="/">
//                                 <p className="smNavItem">Home</p>
//                             </Link>
//                             <p className="smNavItem">Cart</p>
//                             <button className="logOutButton" onClick={onClickLogout}>Logout</button>
//                         </div>
//                     </Popup>
//                 </div>
//             </nav>
//             <div className="smSearch-container">
//                 <IoSearch size={20} />
//                 <input type="search" className="searchInput" onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} />
//             </div>
//         </div>
//     )

// }

export default withRouter(Header)
