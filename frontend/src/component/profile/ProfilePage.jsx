import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Container, Row, Col, Card, Button, Alert, Image, Badge } from 'react-bootstrap';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <Container className="py-5">
            {error && <Alert variant="danger">{error}</Alert>}

            {user && (
                <>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                
                                <Col md={10}>
                                    <h4 className="mb-0">{user.name}</h4>
                                    <p className="text-muted mb-1">{user.email}</p>
                                    <p className="text-muted">{user.phoneNumber}</p>
                                    <Button variant="primary" className="me-2" onClick={handleEditProfile}>
                                        Edit Profile
                                    </Button>
                                    <Button variant="outline-danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <h5 className="mb-3">My Booking History</h5>

                    {user.bookings && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <Card className="mb-3 shadow-sm" key={booking.id}>
                                <Card.Body>
                                    <Row>
                                        <Col md={3}>
                                            <Image
                                                src={booking.facility.facilityPhotoUrl}
                                                alt="Facility"
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="fw-bold">
                                                {booking.facility.facilityType}{' '}
                                                <Badge bg="secondary">{booking.dayOfWeek}</Badge>
                                            </h6>
                                            <p>
                                                <strong>Booking Code:</strong> {booking.bookingConfirmationCode}
                                            </p>
                                            <p>
                                                <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                                            </p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <Alert variant="info">You haven't made any bookings yet.</Alert>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProfilePage;
