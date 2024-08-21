import {Link} from "react-router-dom"
import Header from "../Header"
import SuccessAnimation from '../SuccessAnimation.json'
import Lottie from "lottie-react"
import "./index.css"


const OrderSuccess = () =>(
    <>
    <Header />
    <div className="order-successful-container">
      <div className="order-successful-responsive-container">
        {/* <img
          className="order-successful-image"
          src="https://res.cloudinary.com/nsp/image/upload/v1636426713/tastyKitchens/successful_1x_micicp.png"
        alt=""
        /> */}
        <Lottie animationData={SuccessAnimation} className="succesAnimation" />
        <h1 className="order-successful-heading">
          Payment Successful
        </h1>
        <p className="order-successful-para">
          Thank you for ordering <br />
          Your payment is successfully completed.
        </p>
        <Link to="/" className="link">
          <button type="button" className="order-successful-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
    </>
)

export default OrderSuccess