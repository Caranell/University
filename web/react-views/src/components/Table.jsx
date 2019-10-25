import React, { Component } from "react";
import EditMenu from "./EditMenu";

class Table extends Component {
  state = {
    data: [],
    showPopup: false,
    filter: {
      body: {
        value: null
      },
      country: {
        value: null
      },
      date:{
        value:{
          from:null,
          to: null,
        }
      },
      car4x4:{
        value: null
      }
    },
    sort:{
      column: null,
      direction: null,
    }
  };
  componentWillMount = () => {};
  componentWillUnmount = () =>{
    localStorage.removeItem('tableData'); 
  }
  componentDidUpdate = async () => {
    const data  = await JSON.parse(localStorage.getItem('tableData'));
    let newData = data;
    const { filter } = this.state
    for (const key of Object.keys(filter)) {
      if( filter[key].value !== null) {
        newData = newData.filter(item => item[key]===filter[key].value)
      } else {

      }
    }
  }
  onFilterUpdate = (column) => {

  }
  onSortUpdate = (column) => {

  }
  getData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cars',{
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
      const result = await response.json();
      if (result.error){
        throw new Error(json.message);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  createInfo = car => {};

  deleteInfo = id => {};
  updateInfo = car => {};

  render() {
    return <div className="container">
      <div className="table-wrapper">
        <div className="table__main">
          <tr className="table__header">

          </tr>
        </div>
      </div>
    </div>
  }
}

export default Table;
