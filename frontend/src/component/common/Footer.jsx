import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
    return (
        <footer className="bg-dark text-light mt-5 pt-4 pb-2">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Phegon Hotel</h5>
                        <p>Your perfect stay and booking solution. Safe, simple, and fast reservations.</p>
                    </Col>

                    <Col md={4}>
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/home" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/facilities" className="text-light text-decoration-none">Rooms</a></li>
                            <li><a href="/find-booking" className="text-light text-decoration-none">Find Booking</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6>Contact Us</h6>
                        <p>Email: support@phegonhotel.com</p>
                        <p>Phone: +252-61-1234567</p>
                        <p>Address: Mogadishu, Somalia</p>
                    </Col>
                </Row>

                <hr className="border-light" />

                <Row className="text-center">
                    <Col>
                        <small>
                            &copy; {new Date().getFullYear()} Phegon Hotel. All Rights Reserved.
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterComponent;
