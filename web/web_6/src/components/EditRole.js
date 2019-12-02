import React, { Component } from "react";
import "../styles/main.css";
import { Button } from "react-bootstrap";

class EditRole extends Component {
  state = {
    item: {
      name: "",
      roleType: ""
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

      window.open(`http://localhost:3000/welcome/roles`, "_self").close();
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
        `http://localhost:3000/welcome/getRole/${id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
			);
			console.log('response', response);
      const result = await response.json();
			console.log('result', result)
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
		const { item } = this.state;
		console.log('item', item)
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

export default EditRole;
