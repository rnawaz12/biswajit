import React, { useContext } from 'react';
import './topbar.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FiGrid, FiBell, FiSettings } from "react-icons/fi";
import { GrApps } from "react-icons/gr"
import { Link } from 'react-router-dom';
import { UserContext } from '../../states/contexts/UserContext';


export default function Topbar() {
    const { dispatch, user } = useContext(UserContext)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT_USER" });
    }
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>  <FiGrid style={{ marginTop: "-5px" }} /></Navbar.Brand>
                    <Navbar.Brand as={Link} to="/">PCTeRP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Activities" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Events</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Tasks action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Project Tasks</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Phone Calls</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Transactions" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Purchases</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Sales</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Inventory</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Customers</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Entities" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Customers</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/employees">Employees</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Vendors</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Partners</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Reports" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Saved Reports</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Financial Reports</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Purchase</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Vendors/Payables</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Employees/HR</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Customization" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/lists">Lists</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another Customization</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Something</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Setup" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/lists">Lists</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another Customization</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Something</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <Nav>

                            <NavDropdown title={user.firstName + " " + user.lastName} drop="left" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="d-grid gap-2">
                                    <Button onClick={handleLogout} variant="primary" size="sm">Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/notification"><FiBell /></Nav.Link>
                            <Nav.Link as={Link} to="/settings"><FiSettings /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>

    )
}
