import React from "react";
import { BASE_URL } from "../util/constants";
import { Table, Button } from "react-bootstrap";
import "../styles/main.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faSortAmountDown,
  faSortAmountUpAlt
} from "@fortawesome/free-solid-svg-icons";

class CarsTable extends React.Component {
  state = {
    data: [],
    links: [],
    page: 0,
    generateValues: 1,
    countries: [],
    filter: {
      body: {
        value: null
      },
      country: {
        value: null
      },
      date_from: {
        value: null
      },
      date_to: {
        value: null
      },
      car4x4: {
        value: null
      }
    },
    sort: {
      column: null,
      direction: null
    },
    user_roles: []
  };

  async componentDidMount() {
    // const roles = await JSON.parse(localStorage.getItem("userData")).role;
    // this.setState({
    //   user_roles: roles
    // });
    // if [5, 4].includes(role_)
    await this.getData();
  }

  getCountries = async () => {
    const response = await fetch(`http://localhost:3000/welcome/countries`, {
      method: "get"
    });
    const result = await response.json();
    this.setState({
      ...this.state,
      countries: result
    });
  };
  applyFilter = () => {};

  updateSorting = sortColumn => {
    const { sort } = this.state;
    let newDirection;
    if (sortColumn === sort.column) {
      newDirection = sort.direction === "ASC" ? "DESC" : "ASC";
    } else {
      newDirection = "DESC";
    }
    this.setState(
      {
        ...this.state,
        sort: {
          column: sortColumn,
          direction: newDirection
        }
      },
      () => {
        this.getData();
      }
    );
  };

  handlePagination = pagination => {
    const body = new DOMParser().parseFromString(pagination, "text/html").body
      .children;
    const links = [];
    for (const element of body) {
      switch (element.tagName) {
        case "A":
          links.push({
            link: element.href,
            text: element.innerHTML
              .replace("&gt", ">")
              .replace("&lt", "<")
              .replace(";", "")
          });
          break;
        case "STRONG":
          links.push({ text: element.innerHTML });
          break;
      }
    }
    return links;
  };

  getData = async link => {
    try {
      const { filter, sort } = this.state;
      const response = await fetch(
        link ? link : `http://localhost:3000/welcome/getPageRecords/1`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            filter: filter,
            sort: sort
          })
        }
      );
      const result = await response.json();
      if (result.error) {
        throw new Error("result.message");
      }
      const { pagination, cars } = result;
      let page = result.page;
      const links = this.handlePagination(pagination);
      this.setState({
        ...this.state,
        data: cars,
        links,
        page: page
      });
    } catch (err) {
      console.log(err);
    }
  };

  editRecord = id => {
    window
      .open(
        `http://localhost:3000/welcome/modifyRecord?id=${id || ""}`,
        "_self"
      )
      .close();
  };

  deleteRecord = async id => {
    await fetch(`http://localhost:3000/welcome/deleteRecord/${id}`, {
      method: "get"
    });
    this.getData(
      `http://localhost:3000/welcome/getPageRecords/${this.state.page}`
    );
  };

  handleGeneratedNumber = e => {
    let { value } = e.target;
    value = value < 1 ? 1 : value;
    this.setState({
      ...this.state,
      generateValues: value
    });
  };

  generateRecords = () => {
    const { generateValues } = this.state;
    fetch(
      `http://localhost:3000/welcome/generateUniqueRecords/${generateValues}`
    );
  };

  handleFilterChange = e => {
    e.persist();
    const { page } = this.state;
    let { name: field, value } = e.target;
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          [field]: {
            value: value
          }
        }
      },
      () => {
        this.getData(`http://localhost:3000/welcome/getPageRecords/${page}`);
      }
    );
  };

  render() {
    const {
      data,
      links,
      sort,
      generateValues,
      filter,
      user_roles
    } = this.state;
    const headers = data.length ? Object.keys(data[0]) : [];
    return (
      <div className="container">
        {user_roles.includes(5) && (
          <Button
            onClick={() => this.editRecord()}
            style={{ margin: "20px auto" }}
          >
            Add
          </Button>
        )}
        <div className="input-group">
          <Button
            style={{ marginLeft: "25px" }}
            onClick={() => this.generateRecords()}
          >
            generate
          </Button>
          <input
            className="form-control"
            type="number"
            value={generateValues}
            min={1}
            onChange={e => this.handleGeneratedNumber(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="input-group">
          <label style={{ marginLeft: "25px" }}>Country</label>
          <input
            className="form-control"
            type="text"
            name="country"
            value={filter.country.value}
            onChange={e => this.handleFilterChange(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="input-group">
          <label style={{ marginLeft: "25px" }}>Body</label>
          <input
            className="form-control"
            type="text"
            name="body"
            value={filter.body.value}
            onChange={e => this.handleFilterChange(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="input-group">
          <label style={{ marginLeft: "25px" }}>car4x4</label>
          <input
            className="form-control"
            type="number"
            name="car4x4"
            value={filter.car4x4.value}
            min={0}
            max={1}
            onChange={e => this.handleFilterChange(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="input-group">
          <label style={{ marginLeft: "25px" }}>date_from</label>
          <input
            className="form-control"
            type="text"
            name="date_from"
            value={filter.date_from.value}
            onChange={e => this.handleFilterChange(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="input-group">
          <label style={{ marginLeft: "25px" }}>date_to</label>
          <input
            className="form-control"
            type="text"
            name="date_to"
            value={filter.date_to.value}
            onChange={e => this.handleFilterChange(e)}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="table__wrapper">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx} onClick={() => this.updateSorting(header)}>
                    {header}
                    {sort.column === header ? (
                      <FontAwesomeIcon
                        style={{ marginLeft: "8px" }}
                        icon={
                          sort.direction === "ASC"
                            ? faSortAmountUpAlt
                            : faSortAmountDown
                        }
                      />
                    ) : (
                      ""
                    )}
                  </th>
                ))}
                {user_roles.includes(4) && <th></th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, row_idx) => (
                <tr key={row_idx}>
                  {Object.keys(row).map((cell, cell_idx) => (
                    <td key={cell_idx}>{row[cell]}</td>
                  ))}
                  {user_roles.includes(4) && (
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => this.editRecord(row["id"])}
                        style={{ marginRight: "7px" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => this.deleteRecord(row["id"])}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <nav className="pagination__wrapper">
          <ul className="pagination pagination__links justify-content-center">
            {links.map((item, idx) =>
              item.link ? (
                <li key={idx} className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      this.getData(item.link);
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ) : (
                <li
                  key={idx}
                  className="page-item active"
                  style={{ color: "red" }}
                >
                  <a className="page-link">{item.text}</a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default CarsTable;
