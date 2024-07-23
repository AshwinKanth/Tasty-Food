import { Component } from "react";
import {Redirect} from 'react-router-dom'
import { IoIosEye,IoIosEyeOff } from "react-icons/io";

import Cookies from 'js-cookie'

import "./index.css"


class LoginPage extends Component {
    state={username:'' , password:'', errMsg: '',isPasswordVisible: false,}


    onChangeUsername = event =>{
        this.setState({username: event.target.value})
    }

    onChangePassword = event =>{
        this.setState({password: event.target.value})
    }

    onClickShow = () => {
        this.setState({
          isPasswordVisible: true,
        })
      }
    
      onClickHide = () => {
        this.setState({
          isPasswordVisible: false,
        })
      }


    renderShowPassword = () => {
        const {password, isPasswordVisible} = this.state
        return (
          <>
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <div  className="showPassword-container">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
              {isPasswordVisible ? (
                <button
                  type="button"
                  className="eye-button"
                  onClick={this.onClickHide}
                >
                  <IoIosEyeOff className="eye" />
                </button>
              ) : (
                <button
                  type="button"
                  className="eye-button"
                  onClick={this.onClickShow}
                >
                  <IoIosEye className="eye" />
                </button>
              )}
            </div>
          </>
        )
      }

onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }


onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

    render() {
        const {username,errMsg} = this.state
        const jwtToken = Cookies.get('jwt_token')
    
        if (jwtToken !== undefined) {
          return <Redirect to="/" />
        }


        return (
            <div className="loginPage-container">
                <div className="login-container">
                    <div className="log-container">
                        <div className="appName-container">
                            <img className="tastyFoodLogo" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720513006/TastyFood_Image_gni5dd.png" alt="" />
                            <h1 className="loginHeading">Login</h1>
                        </div>
                        <form className="form-container" onSubmit={this.onSubmitForm}>
                            <label className="label" htmlFor="username">USERNAME</label>
                            <input type="text" id="username" className="input" value={username} onChange={this.onChangeUsername}  placeholder="Username"/>
                            {this.renderShowPassword()}
                            <button className="loginButton" type="submit">Login</button>
                            <p className="err-msg">{errMsg}</p>
                        </form>
                    </div>
                </div>
                <div className="loginImage-container">
                    <img className="tastyFoodImage" src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720512930/TastyFoodImage_arcndm.jpg" alt="" />
                </div>
            </div>
        )
    }
}


export default LoginPage
