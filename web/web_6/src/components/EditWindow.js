import React, { Component } from "react";
import "../styles/main.css";
import { Button } from "react-bootstrap";

class Editing extends Component {
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
    },
    errors: {}
  };

  hasErrors = () => {
    const { errors } = this.state;
    const foundErrors = Object.values(errors).filter(item => !!item);
    return foundErrors.length;
  };

  onSubmit = async e => {
    try {
      e.preventDefault();
      const { item } = this.state;
      const response = await fetch(
        `http://localhost:3000/Rest/list`,
        {
          method: "POST",
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
        window.open(`http://localhost:3000/Rest/table`, "_self").close();
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

  validateInput = (key, value) => {
    switch (key) {
      case "brand":
      case "owner":
      case "country":
        value.length > 200
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "слишком длинное  значение"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
      case "horses":
      case "time100":
        typeof value !== "number"
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "значение должно быть числом"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
      case "license_plate":
        value.length !== 9 || !value.match(/^[A-Z]{1}(\d){3}[A-Z]{2}(\d){3}$/)
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "некорректный номер автомобиля"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
      case "car4x4":
        !(value === "0" || value === "1")
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "Среди значений может быть лишь 1 и 0"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
      case "body":
        !["couple", "SUV", "hatchback", "sedan"].includes(value)
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "неподдерживаемый тип автомобиля"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
      case "production_date":
        !value.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "некорректный тип даты"
              }
            })
          : this.setState({ errors: { ...this.state.errors, [key]: "" } });
        break;
    }
  };

  componentDidMount = async () => {
    const { id } = this.props;
    if (id) {
      const response = await fetch(
        `http://localhost:3000/Rest/getRecord/${id}`,
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
        `http://localhost:3000/Rest/generateUniqueRecord`,
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
          <Button onClick={() => this.getGeneratedValues()}>generate </Button>
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
                  {errors[key] ? (
                    <div className="alert alert-danger">{errors[key]}</div>
                  ) : (
                    ""
                  )}
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

export default Editing;
