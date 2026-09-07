import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import {
  Container, Row, Col, Form, Button, Alert, Card, Spinner, Image, ListGroup,
} from 'react-bootstrap';

const FacilityDetailsPage = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams();
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userId, setUserId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const facilityResponse = await ApiService.getFacilityById(facilityId);
        if (facilityResponse && facilityResponse.facility) {
          setFacilityDetails(facilityResponse.facility);
        } else {
          setErrorMessage('Facility data not available.');
        }

        if (ApiService.isAuthenticated()) {
          try {
            const userResponse = await ApiService.getUserProfile();
            if (userResponse && userResponse.user) {
              setUserId(userResponse.user.id);
            }
          } catch (profileErr) {
            console.error('Failed to load user profile:', profileErr.message);
          }
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [facilityId]);

  const handleConfirmBooking = () => {
    if (!dayOfWeek || !startTime || !endTime) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    if (startTime >= endTime) {
      setErrorMessage('End time must be after start time.');
      return;
    }

    const start = parseFloat(startTime);
    const end = parseFloat(endTime);
    const hours = end - start;
    const price = hours * (facilityDetails?.facilityPrice || 0);
    setTotalPrice(price);
    setErrorMessage('');
  };

  const acceptBooking = async () => {
    if (!ApiService.isAuthenticated()) {
      setErrorMessage('You must be logged in to book a facility. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    let currentUserId = userId;
    if (!currentUserId) {
      try {
        const userResponse = await ApiService.getUserProfile();
        if (userResponse && userResponse.user) {
          currentUserId = userResponse.user.id;
          setUserId(currentUserId);
        }
      } catch (err) {
        setErrorMessage('Session expired or user profile unavailable. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
    }

    try {
      const booking = { dayOfWeek, startTime, endTime };
      const response = await ApiService.saveBooking(facilityId, currentUserId, booking);

      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setErrorMessage('');

        setTimeout(() => {
          setShowMessage(false);
          navigate('/facilities');
        }, 6000);
      } else {
        setErrorMessage(response.message || 'Failed to complete booking.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading facility details...</p>
      </Container>
    );
  }

  if (!facilityDetails) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Facility not found.</Alert>
      </Container>
    );
  }

  const {
    facilityName = 'N/A',
    facilityType = 'N/A',
    facilityPrice = 0,
    description = '',
    facilityPhotoUrl = '',
    bookings = [],
  } = facilityDetails;

  return (
    <Container className="mt-4">
      {showMessage && (
        <Alert variant="success">
          Booking confirmed! Code: <strong>{confirmationCode}</strong>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}

      <Card className="mb-4 shadow-sm">
        <Row className="g-0">
          <Col md={5}>
            <Image
              src={facilityPhotoUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={facilityName}
              fluid
              rounded
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title><strong>Name:</strong> {facilityName}</Card.Title>
              <Card.Text><strong>Type:</strong> {facilityType}</Card.Text>
              <Card.Text><strong>Price:</strong> ${facilityPrice} /hour</Card.Text>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Card className="mb-4">
        <Card.Header>Book This Facility</Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="dayOfWeek">
                  <Form.Label>Day of Week</Form.Label>
                  <Form.Select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                    <option value="">Select Day</option>
                    {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time (24h)</Form.Label>
                  <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time (24h)</Form.Label>
                  <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleConfirmBooking}>Confirm Booking</Button>

              {totalPrice > 0 && (
                <>
                  <p className="m-0 align-self-center">Total Price: <strong>${totalPrice}</strong></p>
                  <Button variant="success" onClick={acceptBooking}>Accept Booking</Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {bookings && bookings.length > 0 && (
        <Card>
          <Card.Header>Existing Bookings</Card.Header>
          <ListGroup variant="flush">
            {bookings.map((b, index) => (
              <ListGroup.Item key={b.id}>
                Booking {index + 1}: {b.dayOfWeek} from {b.startTime} to {b.endTime}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
};

export default FacilityDetailsPage;
