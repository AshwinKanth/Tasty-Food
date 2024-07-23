import { Component } from "react";
import Loader from "react-loader-spinner"
import Cookies from "js-cookie";
import Header from "../Header";
import { FaStar } from "react-icons/fa";
import FoodItem from "../FoodItem";
import "./index.css"

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}


class RestaurantItemDetails extends Component {
    state = { restaurantItemsList: [], restaurantFoodItem: [], apiStatus: apiStatusConstant.initial, searchInput: "" }

    componentDidMount() {
        this.getRestaurantDetails()
    }


    getFormattedData = (data) => ({
        imageUrl: data.image_url,
        name: data.name,
        cuisine: data.cuisine,
        location: data.location,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        costForTwo: data.cost_for_two,
        cost: data.cost,
        id: data.id,
    })

    getRestaurantDetails = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const jwtToken = Cookies.get("jwt_token")
        const { match } = this.props
        const { params } = match
        const { id } = params


        const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: "GET"
        }

        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const fetchedData = await response.json();
            const updatedData = this.getFormattedData(fetchedData)
            const foodItemUpdatedData = fetchedData.food_items.map(eachItem => this.getFormattedData(eachItem))

            this.setState({ restaurantItemsList: updatedData, restaurantFoodItem: foodItemUpdatedData, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }
    }

    onChangeSearchInput = (event) => {
        this.setState({searchInput: event.target.value  })
    }

    renderFoodItem = () => {
        const { restaurantFoodItem, searchInput } = this.state

        const updatedList = restaurantFoodItem.filter(each =>
            each.name.toLowerCase().includes(searchInput.toLowerCase()),
        )

        return (
            <>
                <div className="search-container">
                    <input
                        type="search"
                        placeholder="Search Biryani, Pizza..."
                        className="search-input"
                        onChange={this.onChangeSearchInput}
                    />
                </div>
                {updatedList.length === 0 ? (
                    <div className="no-products-view">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                        className="no-products-img"
                        alt="no products"
                    />
                    <p className="no-products-description">
                    No Item Found
                    </p>
                </div>
                ) : (
                    <ul className="foodList-container">
                        {updatedList.map(eachFood => (
                            <FoodItem key={eachFood.id} foodItemDetails={eachFood} />
                        ))}
                    </ul>
                )}
            </>
        )
    }


    renderRestaurantItemDetails = () => {
        const { restaurantItemsList } = this.state
        const { imageUrl, name, cuisine, location, rating, reviewsCount, costForTwo } = restaurantItemsList
        return (
            <div className="restaurantDetails-container">
                <div className="restaurant-container">
                    <img src={imageUrl} alt="name" className="foodImage" />
                    <div className="resDetails">
                        <h1 className="resName">{name}</h1>
                        <p className="resCuisine">{cuisine}</p>
                        <p className="resLocation">{location}</p>
                        <div className="ratingPrice-container">
                            <div>
                                <p><FaStar size={15} color="#ffffff" /> <span className="rating">{rating}</span></p>
                                <p className="reviewsCount">{reviewsCount}+ Ratings</p>
                            </div>
                            <hr className="verBreak" />
                            <div className="price-container">
                                <p className="rating">₹ {costForTwo}</p>
                                <p className="reviewsCount">Cost for two</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderFoodItem()}
            </div>
        )
    }


    renderLoadingView = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#F7931E" height={40} width={40} />
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


    rendeRestaurantItemsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderRestaurantItemDetails();
            case apiStatusConstant.inProgress:
                return this.renderLoadingView();
            case apiStatusConstant.failure:
                return this.renderFailureView()
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className="restaurantItemDetails-container">
                    {this.rendeRestaurantItemsView()}
                </div>
            </>
        )
    }
}

export default RestaurantItemDetails