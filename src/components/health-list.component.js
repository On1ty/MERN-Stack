import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Health = (props) => {
  return (
    <tr>
      <td>{props.health.fullname}</td>
      <td>{props.health.temperature}</td>
      <td>{props.health.email}</td>
      <td>{props.health.phonenumber}</td>
      <td>
        <Link
          to={"/edit/" + props.health._id}
          className="btn btn-sm btn-primary"
        >
          Edit
        </Link>
        <a
          className="btn btn-sm btn-danger"
          href="#"
          onClick={() => {
            props.deleteHealth(props.health._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};
export default class HealthList extends Component {
  constructor(props) {
    super(props);

    this.state = { health: [] };

    this.deleteHealth = this.deleteHealth.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/health")
      .then((res) => this.setState({ health: res.data }))
      .catch((err) => console.log("Error: ", err));
  }

  deleteHealth(id) {
    axios
      .delete("http://localhost:5000/health/" + id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          health: this.state.health.filter((el) => el._id !== id),
        });
      })
      .catch((err) => console.log("Error: ", err));
  }

  healthDeclaration() {
    return this.state.health.map((data) => {
      return (
        <Health health={data} deleteHealth={this.deleteHealth} key={data._id} />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Health List</h1>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Full Name</th>
              <th>Temperature</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{this.healthDeclaration()}</tbody>
        </table>
      </div>
    );
  }
}
