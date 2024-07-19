import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner"
import Header from "../Header";
import ReactSlick from "../ReactSlick"
import Filters from "../Filters";
import Footer from "../Footer";
import RestaurantItem from "../RestaurantItem";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import './index.css'


const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

const sortByOptions = [
    {
        id: 0,
        displayText: 'Highest',
        value: 'Highest',
    },
    {
        id: 2,
        displayText: 'Lowest',
        value: 'Lowest',
    },
]

class Home extends Component {
    state = { restaurantsList: [], currentPage: 0, searchInput: '', sortOption: sortByOptions[1].value, apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getrestaurantsList()
    }

    getrestaurantsList = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const jwtToken = Cookies.get('jwt_token')
        const { currentPage, searchInput, sortOption } = this.state

        const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${currentPage * 9}&limit=${9}&sort_by_rating=${sortOption}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: "GET"
        }
        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const data = await response.json();
            const updatedData = data.restaurants.map(eachItem => ({
                id: eachItem.id,
                name: eachItem.name,
                imageUrl: eachItem.image_url,
                cuisine: eachItem.cuisine,
                totalReviews: eachItem.user_rating.total_reviews,
                rating: eachItem.user_rating.rating
            }))
            console.log(data)
            this.setState({ restaurantsList: updatedData, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }
    }

    renderRestaurants = () => {
        const { restaurantsList } = this.state
        const shouldShowRestaurantList = restaurantsList.length > 0

        return shouldShowRestaurantList ? (
            <ul className="restaurants-container">
                {restaurantsList.map(eachRes => (
                    <RestaurantItem key={eachRes.id} restaurantItemDetails={eachRes} />
                ))}
            </ul>
        ) : (
            <div className="no-products-view">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className="no-products-img"
                    alt="no products"
                />
                <h1 className="no-products-heading">No Products Found</h1>
                <p className="no-products-description">
                    We could not find any products.
                </p>
            </div>
        )
    }

    onClickRightArrow = () => {
        const { currentPage } = this.state

        if (currentPage < 3) {
            this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), this.getrestaurantsList)
        }
    }

    onClickLeftArrow = () => {
        const { currentPage } = this.state

        if (currentPage > 0) {
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }), this.getrestaurantsList)
        }
    }

    enterSearchInput = () => {
        this.getrestaurantsList()
    }

    changeSearchInput = searchInput => {
        this.setState({ searchInput })
    }

    updateOption = option => {
        this.setState({ sortOption: option }, this.getrestaurantsList)
    }


    renderLoadingView = () => (
        <div className="homeLoader-container" data-testid="loader">
            <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
        </div>
    )

    renderFailureView = () => (
        <div className="no-jobs-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="no-jobs-image"
            />
            <h1 className="failureHeading">Oops! Something Went Wrong</h1>
            <p className="failureDescription">
                We cannot seem to find the page you are looking for
            </p>
            <button type="button" className="failureButton" onClick={this.getrestaurantsList}>
                Retry
            </button>
        </div>
    )

    rendeRestaurantsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderRestaurants();
            case apiStatusConstant.inProgress:
                return this.renderLoadingView();
            case apiStatusConstant.failure:
                return this.renderFailureView()
            default:
                return null;
        }
    }


    render() {
        const { currentPage, searchInput, sortOption } = this.state
        return (
            <>
                <Header searchInput={searchInput} changeSearchInput={this.changeSearchInput} enterSearchInput={this.enterSearchInput} />
                <ReactSlick />
                <Filters
                    sortOption={sortOption}
                    sortByOptions={sortByOptions}
                    updateOption={this.updateOption} />
                <hr className="break" />
                {this.rendeRestaurantsView()}
                <div className="restaurantNavigation">
                    <button className="angleIcon" type="button" onClick={this.onClickLeftArrow}>
                        <MdKeyboardArrowLeft size={20} />
                    </button>
                    <p className="pageNum">{currentPage + 1} of 4</p>
                    <button className="angleIcon" type="button" onClick={this.onClickRightArrow}>
                        <MdKeyboardArrowRight size={20} />
                    </button>
                </div>
                <Footer />
            </>
        )
    }
}

export default Home