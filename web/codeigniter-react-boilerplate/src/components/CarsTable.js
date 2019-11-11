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
    filter: {
      body: {
        value: null
      },
      country: {
        value: null
      },
      date: {
        value: {
          from: null,
          to: null
        }
      },
      car4x4: {
        value: null
      }
    },
    sort: {
      column: null,
      direction: null
    }
  };

  async componentDidMount() {
    await this.getData();
  }

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

  createRecord = () => {
    fetch(`http://localhost:3000/welcome/modifyRecord`, {
      method: "get"
    });
  };

  editRecord = id => {
    window
      .open(`http://localhost:3000/welcome/modifyRecord?id=${id || ''}`, "_self")
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

  render() {
    const { data, links, page, sort } = this.state;
		const headers = data.length ? Object.keys(data[0]) : [];
    return (
      <div className="container">
				<Button onClick={()=> this.editRecord()}>Add</Button>
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
