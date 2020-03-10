import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faHospital } from '@fortawesome/free-solid-svg-icons';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <Navbar
                dark 
                sticky="top" 
                expand="md" 
                className="navbar navbar-dark bg-primary navbar-expand-lg" 
            >
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="https://s3-us-west-1.amazonaws.com/fraymework/multimedia/images/icons/apps/npicheck.png" style={{ height: 25 }} alt='logo' />
                        {' '}
                        <font style={{ fontWeight: 500}}>
                            SearchNPI.info
                        </font>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/individual" className="nav-link">
                                    <FontAwesomeIcon icon={ faUserMd } />
                                    {' '}
                                    Individual
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/organization" className="nav-link">
                                    <FontAwesomeIcon icon={ faHospital } />
                                    {' '}
                                    Organization
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}