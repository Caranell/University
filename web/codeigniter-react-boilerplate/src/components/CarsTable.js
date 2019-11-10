import React from "react";
import { BASE_URL } from "../util/constants";
import { Table, Button } from "react-bootstrap";
import "../styles/main.css";

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

  updateSorting = column => {};

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

  // handleLinks = (pagination, page) => {
  //   const hrefs = pagination.match(/http.*?"/g).map(item => item.slice(0, -1));
  //   const linksTexts = pagination
  //     .match(/>.*?</g)
  //     .map(item => item.slice(1, -1))
  //     .filter(item => !!item);
  //   const innerNumbers = pagination
  //     .match(/"\d+"/g)
  //     .map(item => +item.slice(1, -1));
  //   console.log("innerNumbers", innerNumbers);
  //   console.log("hrefs", hrefs);
  //   console.log("linksTexts", linksTexts);

  //   const links = this.hanglePagination(pagination);
  //   for (let i in linksTexts) {
  //     let newVal;
  //     if (page !== +linksTexts[i]) {
  //       newVal = {
  //         link: hrefs[i],
  //         text: linksTexts[i],
  //         pageNum: innerNumbers[i]
  //       };
  //     } else {
  //       newVal = { text: linksTexts[i] };
  //     }
  //     links.push(newVal);
  //     console.log("newVal", newVal);
  //   }
  //   return links;
  // };

  getData = async link => {
    try {
      const response = await fetch(
        link ? link : `http://localhost:3000/welcome/getPageRecords/1`,
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
      // console.log('pagination', pagination);
      const { pagination, cars } = result;
      let page = ++result.page;
      console.log("result.page", result.page);
      console.log("page", page);
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
    fetch(`http://localhost:3000/welcome/modifyRecord/${id}`, {
      method: "get"
    });
  };

  deleteRecord = id => {
    fetch(`http://localhost:3000/welcome/${id}`, {
      method: "delete"
    });
  };

  render() {
    const { data, links, page } = this.state;
    console.log("links :", links);
    const headers = data.length ? Object.keys(data[0]) : [];
    return (
      <div className="container">
        <div className="table__wrapper">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, row_idx) => (
                <tr key={row_idx}>
                  {Object.keys(row).map((cell, cell_idx) => (
                    <td key={cell_idx}>{row[cell]}</td>
                  ))}
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
