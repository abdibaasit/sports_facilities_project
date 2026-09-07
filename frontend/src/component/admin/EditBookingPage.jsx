import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col, Image } from 'react-bootstrap';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to achieve this booking?')) {
            return;
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The booking was successfully achieved");

                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Booking Detail</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {bookingDetails ? (
                <Card className="shadow-lg">
                    <Card.Body>
                        <h4 className="mb-4 text-primary">Booking Details</h4>
                        <Row className="mb-3">
                            <Col md={6}><strong>Confirmation Code:</strong></Col>
                            <Col md={6}>#{bookingDetails.bookingConfirmationCode}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Day of Week:</strong></Col>
                            <Col md={6}>{bookingDetails.dayOfWeek}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Start Time:</strong></Col>
                            <Col md={6}>{bookingDetails.startTime}</Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={6}><strong>End Time:</strong></Col>
                            <Col md={6}>{bookingDetails.endTime}</Col>
                        </Row>

                        <hr />

                        <h4 className="mb-4 text-primary">Booker Details</h4>
                        <Row className="mb-3">
                            <Col md={6}><strong>Name:</strong></Col>
                            <Col md={6}>{bookingDetails.user?.name}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Email:</strong></Col>
                            <Col md={6}>{bookingDetails.user?.email}</Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={6}><strong>Phone:</strong></Col>
                            <Col md={6}>{bookingDetails.user?.phoneNumber}</Col>
                        </Row>

                        <hr />

                        <h4 className="mb-4 text-primary">Facility Details</h4>
                        <Row className="mb-3">
                            <Col md={6}><strong>Type:</strong></Col>
                            <Col md={6}>{bookingDetails.facility?.facilityType}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Name:</strong></Col>
                            <Col md={6}>{bookingDetails.facility?.facilityName}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Price:</strong></Col>
                            <Col md={6}>${bookingDetails.facility?.facilityPrice}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}><strong>Description:</strong></Col>
                            <Col md={6}>{bookingDetails.facility?.facilityDescription}</Col>
                        </Row>
                        {bookingDetails.facility?.facilityPhotoUrl && (
                            <Row className="mb-3">
                                <Col md={6}><strong>Image:</strong></Col>
                                <Col md={6}>
                                    <Image
                                        src={bookingDetails.facility.facilityPhotoUrl}
                                        alt="Facility"
                                        fluid
                                        rounded
                                        style={{ maxHeight: '200px' }}
                                    />
                                </Col>
                            </Row>
                        )}

                        <div className="text-center mt-4">
                            <Button variant="danger" onClick={() => acheiveBooking(bookingDetails.id)}>
                                Achieve Booking
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading booking details...</p>
            )}
        </Container>
    );
};

export default EditBookingPage;
