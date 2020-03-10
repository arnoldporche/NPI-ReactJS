import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

document.body.style = "background: #eee;";

const NPI = props => (
  <tr>
      <td>
        <Link to={"/individual/view/"+props.npi.number}>
          {props.npi.basic.last_name}, {props.npi.basic.first_name}
        </Link>
      </td>
      <td>
        {props.npi.taxonomies[0].desc}
      </td>
      <td>
        {props.npi.number}
      </td>
      <td>
        {props.npi.addresses[0].state}
      </td>
  </tr>
)

export default class Individual extends Component {
  constructor(props) {
    super(props);

    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeNPI = this.onChangeNPI.bind(this);
    this.onChangeUSState = this.onChangeUSState.bind(this);
    this.queryNPI = this.queryNPI.bind(this);

    this.state = {
      lastName: "villaluz",
      firstName: "",
      npi: "",
      usState: "NV",
      dataSource: []
    };
  }

  componentDidMount(searchLastName = "", searchFirstName = "", searchNPI = "", searchUSState = "") {
    if (searchLastName !== "" || searchFirstName !== "" || searchNPI > 0) {
      var f = [];

      if (searchLastName !== "") {
        f.push('last_name='+searchLastName);
      }

      if (searchFirstName !== "") {
        f.push('first_name='+searchFirstName);
      }

      if (searchNPI > 0) {
        f.push('number='+searchNPI);
      }

      if (searchUSState !== "") {
        f.push('usState='+searchUSState);
      }

      f.push('enumeration_type=NPI-1');

      var fields = f.join('&');

      f = [];

      axios
        .get("http://ec2-52-39-90-233.us-west-2.compute.amazonaws.com:3000/npiregistry?"+fields)
        .then(response => {
          this.setState({ dataSource: response.data.results });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeNPI(e) {
    this.setState({
      npi: e.target.value
    });
  }

  onChangeUSState(e) {
    this.setState({
      usState: e.target.value
    });
  }

  queryNPI() {
    let searchLastName = this.state.lastName;
    let searchFirstName = this.state.firstName;
    let searchNPI = this.state.npi;
    let searchUSState = this.state.usState;
    this.componentDidMount(searchLastName, searchFirstName, searchNPI, searchUSState);
  }

  npiList() {
      return this.state.dataSource.map(currentnpi => {
        return <NPI npi={currentnpi} key={currentnpi.number} />;
      })
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header bg-info text-white">
            <h3>
              <FontAwesomeIcon icon={ faUserMd } />
              {' '}
              Individual
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>NPI</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.npi}
                    onChange={this.onChangeNPI}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>State</label>
                  <select
                    className="form-control"
                    value={this.state.usState}
                    onChange={this.onChangeUSState}
                  >
                    <option value=""></option>
                    <option value="CA">CA - California</option>
                    <option value="NV">NV - Nevada</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <br />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                    onClick={this.queryNPI}
                  />
                </div>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Classification</th>
                    <th>NPI</th>
                    <th>US State</th>
                </tr>
            </thead>
            <tbody>
                { this.npiList() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
