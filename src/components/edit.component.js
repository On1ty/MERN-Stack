import React, { Component } from "react";
import axios from "axios";

export default class EditHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      temperature: "",
      email: "",
      phonenumber: "",
    };

    // this.onFullNameChange = this.onFullNameChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onValueChange(e) {
    this.setState({
      [e.target.dataset.name]: e.target.value,
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/health/" + this.props.match.params.id)
      .then((res) =>
        this.setState({
          fullname: res.data.fullname,
          temperature: res.data.temperature,
          email: res.data.email,
          phonenumber: res.data.phonenumber,
        })
      )
      .catch((err) => console.log("Error: ", err));
  }

  //   onFullNameChange(e) {
  //     this.setState({
  //       fullname: e.target.value,
  //     });
  //   }

  onSubmitForm(e) {
    e.preventDefault();

    const health = {
      fullname: this.state.fullname,
      temperature: this.state.temperature,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
    };

    axios
      .post(
        "http://localhost:5000/health/update/" + this.props.match.params.id,
        health
      )
      .then((res) => (window.location = "/"))
      .catch((err) => console.log("Error: ", err));
    //   console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <h1>Update Health Declaration</h1>
        <form action="" onSubmit={this.onSubmitForm}>
          <div className="form-group">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              data-name="fullname"
              value={this.state.fullname}
              onChange={this.onValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Temperature</label>
            <input
              type="number"
              className="form-control"
              required
              step="0.1"
              value={this.state.temperature}
              data-name="temperature"
              onChange={this.onValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control"
              required
              data-name="email"
              value={this.state.email}
              onChange={this.onValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              required
              data-name="phonenumber"
              value={this.state.phonenumber}
              onChange={this.onValueChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
