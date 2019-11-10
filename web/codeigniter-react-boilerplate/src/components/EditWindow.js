import React, { Component } from "react";
import "../styles/main.css";

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

  onSubmit = async () => {
    try {
      const { id } = this.props;
      const { item } = this.state;
      const hasId = typeof id !== "undefined";
      const response = await fetch(
        `http://localhost:3000/welcome/modifyRecord/${hasId ? id : ""}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(item)
        }
      );
      if (response.error) {
        throw new Error(response.message);
      }
      fetch("http://localhost:3000/welcome/table");
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
        !["couple", "SUV", "hatchback", "sedan"].includes(value)
          ? this.setState({
              errors: {
                ...this.state.errors,
                [key]: "неподдерживаемый тип автомобиля"
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
        `http://localhost:3000/welcome/getRecord/${id}`,
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

	getGeneratedValues = () => {
		
	};
	
  render() {
    const { item, errors } = this.state;
    return (
      <div
        className="container"
        style={{ display: "flex", "justify-content": "center" }}
      >
        <div className="edit-form__wrapper jusify-content-center">
          <form>
            {Object.keys(item).map((key, idx) =>
              key !== "id" ? (
                <div key={idx} className=" form-group text-center wrapper-div">
                  <label htmlFor={key}>{key}</label>
                  <div>
                    <input
                      className="form-control"
                      id={key}
                      required
                      value={item[key] || ""}
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
                <button type="submit" className="btn btn-wrning">
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
