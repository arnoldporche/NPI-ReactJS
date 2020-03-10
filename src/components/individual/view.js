import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from'moment';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faIdCard, faEnvelope, faBuilding, faPhone, faFax } from '@fortawesome/free-solid-svg-icons';

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
            <div className="card-header bg-info text-white">
                <Link to={"/individual"} className="text-white">
                    <FontAwesomeIcon icon={ faUserMd } />
                    {' '}
                    Individual
                </Link>
                {' '}
                /
                {' '}
                {props.npi.number}
            </div>
            <div className="card-body">
                <strong>{props.npi.basic.first_name} {props.npi.basic.last_name}</strong>, {props.npi.basic.credential}
                <br />
                <small>
                    {props.npi.taxonomies[0].desc}
                </small>
            </div>
        </div>
        <br />
        <div className="card">
            <div className="card-header bg-info text-white">
                <FontAwesomeIcon icon={ faIdCard } />
                {' '}
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
                    <div className="card-header bg-info text-white">
                        <FontAwesomeIcon icon={ faEnvelope } />
                        {' '}
                        Mailing Address
                    </div>
                    <div className="card-body">
                        <Button outline color="info" block>
                            {props.npi.addresses[1].address_1}
                            <br />
                            {props.npi.addresses[1].city}, {props.npi.addresses[1].state} {props.npi.addresses[1].postal_code}
                        </Button>
                        <br />
                        <div className="row">
                            <div className="col">
                                <Button color="primary" size="sm" href="tel:{props.npi.addresses[1].telephone_number}">
                                    <FontAwesomeIcon icon={ faPhone } />
                                    {' '}
                                    {props.npi.addresses[1].telephone_number}
                                </Button>
                            </div>
                            <div className="col">
                                <Button color="secondary" size="sm">
                                    <FontAwesomeIcon icon={ faFax } />
                                    {' '}
                                    {props.npi.addresses[1].fax_number}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-header bg-info text-white">
                        <FontAwesomeIcon icon={ faBuilding } />
                        {' '}
                        Practice Location
                    </div>
                    <div className="card-body">
                        <Button outline color="info" block>
                            {props.npi.addresses[0].address_1}
                            <br />
                            {props.npi.addresses[0].city}, {props.npi.addresses[0].state} {props.npi.addresses[0].postal_code}
                        </Button>
                        <br />
                        <div className="row">
                            <div className="col">
                                <Button color="primary" size="sm" href="tel:{props.npi.addresses[0].telephone_number}">
                                    <FontAwesomeIcon icon={ faPhone } />
                                    {' '}
                                    {props.npi.addresses[0].telephone_number}
                                </Button>
                            </div>
                            <div className="col">
                                <Button color="secondary" size="sm">
                                    <FontAwesomeIcon icon={ faFax } />
                                    {' '}
                                    {props.npi.addresses[0].fax_number}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

export default class IndividualView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        lastName: "",
        firstName: "",
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