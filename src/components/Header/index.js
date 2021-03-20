import React from 'react'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,Link } from 'react-router-dom';
import { signOut } from '../../actions/auth.actions';

function Header(props) {

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut());
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span  className="nav-link" >{auth.user.fullName || auth.user.username}</span>
                </li>
                <li className="nav-item">
                    <span  className="nav-link" onClick={ logout }>Sign out</span>
                </li>
            </Nav>
        );
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="sign-in" className="nav-link">Sign in</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="sign-up" className="nav-link">Sign up</NavLink>
                </li>
            </Nav>
        );
    }

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    { auth.authenticated ? renderLoggedInLinks() : renderNonLoggedInLinks() }
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}

export default Header