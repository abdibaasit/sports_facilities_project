import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ApiService from '../../service/ApiService';

function NavigationBar() {
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(ApiService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(ApiService.isAdmin());
    const [isUser, setIsUser] = useState(ApiService.isUser());

    const refreshAuth = useCallback(() => {
        setIsAuthenticated(ApiService.isAuthenticated());
        setIsAdmin(ApiService.isAdmin());
        setIsUser(ApiService.isUser());
    }, []);

    useEffect(() => {
        refreshAuth();
    }, [location.pathname, refreshAuth]);

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        ApiService.logout();
        window.location.href = '/login';
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/home">
                    SoomaPlay
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/facilities">Facilities</Nav.Link>
                        <Nav.Link as={NavLink} to="/find-booking">Find my Booking</Nav.Link>
                        {isUser && <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>}
                        {isAdmin && <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>}
                    </Nav>

                    <Nav className="ms-auto">
                        {!isAuthenticated && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
                        {!isAuthenticated && <Nav.Link as={NavLink} to="/register">Register</Nav.Link>}
                        {isAuthenticated && (
                            <a
                                href="/login"
                                onClick={handleLogout}
                                className="nav-link"
                                style={{ cursor: 'pointer', color: 'rgba(255,255,255,.55)' }}
                            >
                                Logout
                            </a>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
