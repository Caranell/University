import React from "react";
import ReactDOM from "react-dom";
import CarsTable from "./components/CarsTable";
import Editing from "./components/EditWindow";

const elements = document.getElementsByClassName("App");
const id = document.getElementById("Editing").innerHTML;
for (const element of elements) {
  switch (element.id) {
    case "CarsTable":
      ReactDOM.render(<CarsTable />, document.getElementById("CarsTable"));
      break;
    case "Editing":
      ReactDOM.render(<Editing id={id} />, document.getElementById("Editing"));
      break;
    default:
      break;
  }
}
