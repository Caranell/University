import React, { Component } from "react";
import { BASE_URL } from "../util/constants";
import "../styles/main.css";

export default class LoginPage extends Component {
  submitForm = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/welcome/countries`, {
      //TODO
      method: "get"
    });
    const result = await response.json();
    if (!result.error) {
      localStorage.setItem("userData", JSON.stringify(result));
      window
        .open(`http://localhost:3000/welcome/modifyRecord`, "_self") //TODO
        .close();
    }
	};
	
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Login</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
