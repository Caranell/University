import React from "react";
import ReactDOM from "react-dom";
import CarsTable from "./components/CarsTable";
import UsersTable from "./components/UsersTable";
import RolesTable from "./components/RolesTable";
import EditRole from "./components/EditRole";
import EditUser from "./components/EditUser";
import LoginPage from "./components/LoginPage";
import RoutingPage from "./components/RoutingPage";
import Editing from "./components/EditWindow";

const elements = document.getElementsByClassName("App");
const id = document.getElementById("Editing")
  ? document.getElementById("Editing").innerHTML
  : 899888;
const roleId = document.getElementById("EditRole")
  ? document.getElementById("EditRole").innerHTML
  : 1;
const userId = document.getElementById("EditUser")
  ? document.getElementById("EditUser").innerHTML
  : 1;
for (const element of elements) {
  switch (element.id) {
    case "CarsTable":
      ReactDOM.render(<CarsTable />, document.getElementById("CarsTable"));
      break;
    case "Editing":
      ReactDOM.render(<Editing id={id} />, document.getElementById("Editing"));
      break;
    case "UsersTable":
      ReactDOM.render(<UsersTable />, document.getElementById("UsersTable"));
      break;
    case "RolesTable":
      ReactDOM.render(<RolesTable />, document.getElementById("RolesTable"));
      break;
    case "EditRole":
      ReactDOM.render(
        <EditRole id={roleId} />,
        document.getElementById("EditRole")
      );
      break;
    case "EditUser":
      ReactDOM.render(
        <EditUser id={userId} />,
        document.getElementById("EditUser")
      );
      break;
    case "LoginPage":
      ReactDOM.render(<LoginPage />, document.getElementById("LoginPage"));
      break;
    case "RoutingPage":
      ReactDOM.render(<RoutingPage />, document.getElementById("RoutingPage"));
      break;
    default:
      break;
  }
}
