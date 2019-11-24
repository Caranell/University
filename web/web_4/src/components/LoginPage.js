import React, { Component } from "react";
import { BASE_URL } from "../util/constants";
import "../styles/main.css";

class LoginPage extends Component {
  state = {
    item: {
      email: "",
      password: ""
    }
	};
	
  onSubmit = async e => {
    e.preventDefault();
    const { item } = this.state;
    const response = await fetch(`http://localhost:3000/welcome/loginUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ item: item })
		});
		const result = await response.json();
		console.log('result', result)
		if (!result.error) {
      // localStorage.setItem("userData", JSON.stringify(result));
    }
  };

  handleChange = e => {
    const { id: key, value } = e.target;
    this.setState({
      item: {
        ...this.state.item,
        [key]: value
      }
    });
	};
	
  render() {
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <input
              type="username"
              className="form-control"
              required
              id="name"
              placeholder="Enter username"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              required
              id="password"
              placeholder="Password"
              onChange={e => {
                this.handleChange(e);
              }}
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

export default LoginPage;
