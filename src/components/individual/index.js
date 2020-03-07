import React, { Component } from 'react';

document.body.style = 'background: #eee;';

export default class Individual extends Component {
    constructor(props) {
        super(props);

        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeNPI = this.onChangeNPI.bind(this);
        this.onChangeUSState = this.onChangeUSState.bind(this);
        this.queryNPI = this.queryNPI.bind(this);

        this.state = {
            lastName: 'villaluz',
            firstName: '',
            npi: '',
            usState: '',
            dataSource: []
        }
    }


    componentDidMount(searchLastName = "", searchFirstName = "", searchNPI = "") {
        //console.log("loading..");

        if (searchLastName !== "" || searchFirstName !== "" || searchNPI > 0) {
            let url = 'https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-1&last_name=villaluz';
            let config =  {
                method: "GET",
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-type": "application/json; charset=UTF-8",
                    "access-control-allow-headers": "content-type"
                }
            };

            fetch(url, {mode: "no-cors"})
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
                //.catch(err => console.log(err));
        } else {
            //console.log('no');
        }


        /*
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
*/
        //var fields = f.join('&');

        //var f = [];
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
        //let searchUSState = this.state.usState;alert(searchUSState);
        this.componentDidMount(searchLastName, searchFirstName, searchNPI);
    }

    render() {
        const SearchResults = data => {
            return (
                <div>
                    Names: {data.length}
                </div>
            );
        };

        return (
            <div className="container">
                <br />
                <div className="card">
                    <div className="card-header">
                        <h3>
                            Individualsss
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
                    <SearchResults
                        data={this.state.dataSource.results}
                    />
                    results: {this.state.dataSource.length}
                </div>
            </div>
        );
    }
}