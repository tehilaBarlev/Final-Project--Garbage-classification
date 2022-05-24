import React, { Component } from "react";
import "../index.css";
import CustomInput from "./CustomInput";
import Button from "./Button";
import TakePhoto from "./TakePhoto";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };



  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    // function openCamera() {

    //   <CameraFace />
    //   alert('jj')


    // };
    return (
      <div className="App">
        <form className="form">
          <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={this.handleChange}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={this.handleChange}
            type="password"
          />
  <Button type="button" color="blue" Click="openCamera()" className="form__custom-button" >
    {/* <TakePhoto setImage={setImage} image={image} type={setType}/> */}
            </Button>
          <Link to="/home"><Button type="button" color="blue" className="form__custom-button" >
            Log in
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}
