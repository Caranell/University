import React from "react";
import { BASE_URL } from "../util/constants";
import { Table, Button } from "react-bootstrap";
import "../styles/main.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

class UsersTable extends React.Component {
  state = {
    data: [],
    user_roles: [1, 2, 3, 4, 5]
  };

  async componentDidMount() {
    // const roles = await JSON.parse(localStorage.getItem("userData")).role;
    // this.setState({
    //   user_roles: roles
    // });
    // if [5, 4].includes(role_)
    await this.getData();
  }

  getData = async link => {
    try {
      const response = await fetch(
        link ? link : `http://localhost:3000/welcome/getUsers`,
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
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  };

  editRecord = id => {
    window
      .open(
        `http://localhost:3000/welcome/editUser?id=${id || ""}`,
        "_self"
      )
      .close();
  };

  deleteRecord = async id => {
    await fetch(`http://localhost:3000/welcome/deleteUser/${id}`, {
      method: "get"
    });
    this.getData(
      `http://localhost:3000/welcome/getUsers`
    );
  };

  hasPermission = requirements => {
    const { user_roles } = this.state;
    return user_roles.filter(val => requirements.includes(val)).length;
  };

  render() {
    const { data, user_roles } = this.state;
    const headers = data.length ? Object.keys(data[0]) : [];
    return (
      <div className="container">
        {this.hasPermission([5]) && (
          <Button
            onClick={() => this.editRecord()}
            style={{ margin: "20px auto" }}
          >
            Add
          </Button>
        )}
        <div className="table__wrapper">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
                {user_roles.includes(4) && <th>editing</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, row_idx) => (
                <tr key={row_idx}>
                  {Object.keys(row).map((cell, cell_idx) => (
                    <td key={cell_idx}>{row[cell]}</td>
                  ))}
                  <td>
                    {this.hasPermission([3]) && (
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => this.editRecord(row["id"])}
                        style={{ marginRight: "7px" }}
                      />
                    )}
                    {this.hasPermission([2]) && (
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => this.deleteRecord(row["id"])}
                      />
                    )}
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

export default UsersTable;
