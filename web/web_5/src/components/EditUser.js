import React, { Component } from "react";
import "../styles/main.css";
import { Button } from "react-bootstrap";

class EditUser extends Component {
  state = {
    item: {
      body: "",
      car4x4: "",
      country: "",
      brand: "",
      horses: "",
      license_plate: "",
      owner: "",
      production_date: "",
      time100: ""
    }
  };

  onSubmit = async e => {
    try {
      e.preventDefault();
      const { id } = this.props;
      const { item } = this.state;
      const hasId = typeof id !== "undefined";
      const response = await fetch(
        `http://localhost:3000/welcome/submitRecord`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({ item: item })
        }
      );
      const result = await response.json();
      console.log("result", result);
      if (result) {
        alert("your license_plate is not unique");
      } else {
        window.open(`http://localhost:3000/welcome/table`, "_self").close();
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = e => {
    const { id: key, value } = e.target;
    this.setState(
      {
        item: {
          ...this.state.item,
          [key]: value
        }
      },
      () => {
        this.validateInput(key, value);
      }
    );
  };

  componentDidMount = async () => {
    const { id } = this.props;
    if (id) {
      const response = await fetch(
        `http://localhost:3000/welcome/getUser/${id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
      const result = await response.json();
      if (result.error) {
        throw new Error(result.message);
      }
      this.setState({ item: result.item[0] });
    }
  };

  getGeneratedValues = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/welcome/generateUniqueRecord`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
      const result = await response.json();
      this.setState({
        item: result
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { item, errors } = this.state;
    return (
      <div
        className="container"
        style={{ display: "flex", "justify-content": "center" }}
      >
        <div
          className="edit-form__wrapper jusify-content-center"
          style={{ width: "380px" }}
        >
          <form onSubmit={e => this.onSubmit(e)}>
            {Object.keys(item).map((key, idx) =>
              key !== "id" ? (
                <div key={idx} className=" form-group text-center wrapper-div">
                  <label htmlFor={key}>{key}</label>
                  <div>
                    <input
                      className="form-control"
                      id={key}
                      required
                      value={typeof item[key] !== "undefined" ? item[key] : ""}
                      onChange={e => {
                        this.handleChange(e);
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )
            )}
            <div className=" form-group text-center wrapper-div">
              <div style={{ "margin-top": "30px" }}>
                <button
                  type="submit"
                  disabled={this.hasErrors()}
                  className="btn btn-wrning"
                >
                  отправить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditUser;
