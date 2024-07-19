import { Component } from "react";
import Cookies from "js-cookie";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./index.css"


class ReactSlick extends Component {
    state = { imagesList: [] }

    componentDidMount() {
        this.getSliderImages()
    }

    getSliderImages = async () => {
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = `https://apis.ccbp.in/restaurants-list/offers`

        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: "GET"
        }
        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const data = await response.json()
            const updatedData = data.offers.map(each => ({
                imageUrl: each.image_url,
                id: each.id
            }))

            this.setState({ imagesList: updatedData })
        }
    }


    renderSlideImages = () => {
        const { imagesList } = this.state

        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true
        };

        return (
            <div className="image-container">
                <Slider {...settings}>
                    {imagesList.map(eachImage => (
                        <div key={eachImage.id}>
                            <img src={eachImage.imageUrl} alt="" className="slider-image" />
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }

    render() {
        return (
            <div className="slider-container">
                {this.renderSlideImages()}
            </div>
        )
    }
}


export default ReactSlick
