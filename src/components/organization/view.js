import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from'moment';

document.body.style = "background: #eee;";

const Identifiers = props => (
    props.identifiers.map(identifier => {
        return (
            <li className="list-group-item" key={identifier.identifier}> 
                {identifier.desc}
                <br />
                <small>
                    #{identifier.identifier} | {identifier.state}
                </small>
            </li>
        )
    })
)

const NPI = props => (
    <div>
        <br />
        <div className="card">
            <div className="card-header">
                <Link to={"/organization"}>
                    Organization
                </Link>
                {' '}
                /
                {' '}
                {props.npi.number}
            </div>
            <div className="card-body">
                <strong>{props.npi.basic.name}</strong>
                <br />
                <small>
                    {props.npi.taxonomies[0].desc}
                </small>
            </div>
        </div>
        <br />
        <div className="card">
            <div className="card-header">
                Identifiers
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    National Provider Identifier (NPI)
                    <br />
                    <small>
                        #{props.npi.number}
                        {' '}
                        |
                        {' '}
                        Enumeration Date: {moment(props.npi.basic.enumeration_date.substring(0,10)).format("MM/DD/YYYY")}
                        {' '}
                        |
                        {' '}
                        Last Updated: {moment(props.npi.basic.last_updated.substring(0,10)).format("MM/DD/YYYY")}
                    </small>
                </li>
                <li className="list-group-item">
                    {props.npi.taxonomies[0].desc}
                    <br />
                    <small>
                        #{props.npi.taxonomies[0].license} | {props.npi.taxonomies[0].state}
                    </small>
                </li>
                <Identifiers identifiers={props.npi.identifiers} />
            </ul>
        </div>
        <br />
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        Mailing Address
                    </div>
                    <div className="card-body">
                        {props.npi.addresses[1].address_1}
                        <br />
                        {props.npi.addresses[1].city}, {props.npi.addresses[1].state} {props.npi.addresses[1].postal_code}
                        <br />
                        Phone: {props.npi.addresses[1].telephone_number}
                        <br />
                        Fax: {props.npi.addresses[1].fax_number}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        Practice Location
                    </div>
                    <div className="card-body">
                        {props.npi.addresses[0].address_1}
                        <br />
                        {props.npi.addresses[0].city}, {props.npi.addresses[0].state} {props.npi.addresses[0].postal_code}
                        <br />
                        Phone: {props.npi.addresses[0].telephone_number}
                        <br />
                        Fax: {props.npi.addresses[0].fax_number}
                    </div>
                </div>
            </div>
        </div>
        <br />
    </div>
  )

export default class IndividualView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name: "",
        npi: this.props.match.params.id,
        usState: "NV",
        dataSource: []
      };
    }

    componentDidMount() {
        axios
            .get("http://ec2-52-39-90-233.us-west-2.compute.amazonaws.com:3000/npiregistry?number="+this.props.match.params.id)
            .then(response => {
                this.setState({ dataSource: response.data.results });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.dataSource.map(currentnpi => {
                        return <NPI npi={currentnpi} key={currentnpi.number} />;
                    })
                }
            </div>
        );
    }
}