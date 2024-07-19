import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaStar } from "react-icons/fa";
import "./index.css"

const RestaurantItem = (props) => {
    const {restaurantItemDetails} = props
    const {name,cuisine,rating,totalReviews,imageUrl,id} = restaurantItemDetails
  return (
    <li className='restaurantItem'>
       <Link to={`/restaurants-list/${id}`} className="restaurantLink">
        <img src={imageUrl} alt={name} className='restaurantImage' />
        <div className='restaurantDetails'>
            <h1 className='restaurantName'>{name}</h1>
            <p className='cuisine'>{cuisine}</p>
            <div className='rating-container'>
                <FaStar size={15} color='#f7d707' />
                <p className='restaurantRating'>{rating} <span className='reviewCount'>({totalReviews} ratings)</span></p>
            </div>
        </div>
        </Link>
    </li>
  )
}

export default RestaurantItem