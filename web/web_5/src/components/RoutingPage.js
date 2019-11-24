import React, { Component } from "react";
class RoutingPage extends Component {
  state = {
    user_roles: [1, 2, 3, 4, 5]
  };

  componentDidMount = async () => {
    const user_roles = await JSON.parse(localStorage.getItem("userData")).roles;
    this.setState({
      user_roles: user_roles
    });
  };

  hasPermission = requirements => {
    const { user_roles } = this.state;
    return user_roles.filter(val => requirements.includes(val)).length;
  };

  render() {
    return (
      <nav className="nav flex-column">
        {this.hasPermission([1, 2, 3, 4]) && (
          <a className="nav-link" href={`http://localhost:3000/welcome/users`}>
            Users
          </a>
        )}
        {this.hasPermission([2, 3]) && (
          <a className="nav-link" href={`http://localhost:3000/welcome/roles`}>
            Roles
          </a>
        )}
        {this.hasPermission([4, 5]) && (
          <a className="nav-link" href={`http://localhost:3000/welcome/table`}>
            Data
          </a>
        )}
      </nav>
    );
  }
}
//TODO split(/[\s,]+/g)

export default RoutingPage;
