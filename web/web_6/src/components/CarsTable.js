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
    offset: 0,
    sort: null,
    direction: null,
    user_roles: []
  };

  async componentDidMount() {
    await this.getData();
  }

  updateSorting = sortColumn => {
    const { sort, direction } = this.state;
    let newDirection;
    if (sortColumn === sort) {
      newDirection = direction === "ASC" ? "DESC" : "ASC";
    } else {
      newDirection = "DESC";
    }
    this.setState(
      {
        ...this.state,
        sort: sortColumn,
        direction: newDirection
      },
      () => {
        this.getData();
      }
    );
  };

  getData = async link => {
    try {
      const { sort, direction, offset } = this.state;
      const response = await fetch(
        link
          ? link
          : `http://localhost:3000/Rest/list?sort=${sort}&direction=${direction}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
      const result = await response.json();
      if (result.error) {
        throw new Error("result.message");
      }
      this.setState({
        ...this.state,
        data: result.cars
      });
    } catch (err) {
      console.log(err);
    }
  };

  editRecord = id => {
    window
      .open(`http://localhost:3000/Rest/modifyRecord?id=${id || ""}`, "_self")
      .close();
  };

  deleteRecord = async id => {
    await fetch(`http://localhost:3000/Rest/list?id=${id}`, {
      method: "DELETE"
    });
    this.getData();
  };

  handleOffset = e => {
    let { value } = e.target;
    value = value < 0 ? 0 : value;
    this.setState(
      {
        ...this.state,
        offset: value
      },
      () => {
        this.getData();
      }
    );
  };

  render() {
    const { data, sort, direction, offset, user_roles } = this.state;
    const headers = data.length ? Object.keys(data[0]) : []; //TODO return generate to illustrate adding
    return (
      <div className="container">
        <Button
          onClick={() => this.editRecord()}
          style={{ margin: "20px auto" }}
        >
          Add
        </Button>
        <div className="input-group">
          <input
            className="form-control"
            type="number"
            value={offset}
            min={0}
            onChange={e => this.handleOffset(e)}
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
                    {sort === header ? (
                      <FontAwesomeIcon
                        style={{ marginLeft: "8px" }}
                        icon={
                          direction === "ASC"
                            ? faSortAmountUpAlt
                            : faSortAmountDown
                        }
                      />
                    ) : (
                      ""
                    )}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, row_idx) => (
                <tr key={row_idx}>
                  {Object.keys(row).map((cell, cell_idx) => (
                    <td key={cell_idx}>{row[cell]}</td>
                  ))}
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default CarsTable;
