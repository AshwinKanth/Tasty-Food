import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

import "./index.css"


const Footer = () =>(
    <div className="footer-container">
        <div className="appNameAndLogo">
        <img className="FooterImage" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720513006/TastyFood_Image_gni5dd.png" alt="" />
        <p className="appName">TastyFood</p>
        </div>
        <p className="footerDescription">The only thing we are serious about is food. <br/>Contact us on</p>
        <div>
            <img className="printrestImage footerIcon" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720777383/App_Logo_Inspiraton_111_h6qkqq.jpg" alt=""/>
            <FaInstagram size={20} className="footerIcon" />
            <FaTwitterSquare size={20} className="footerIcon"/>
            <FaFacebookSquare size={20} className="footerIcon"/>
        </div>
    </div>
)


export default Footer