import { useState } from 'react';
import ApiService from '../../service/ApiService';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Image
} from 'react-bootstrap';

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a booking confirmation code");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
      setBookingDetails(response.booking);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Find Your Booking</h2>
            <Form>
              <Form.Group controlId="confirmationCode">
                <Form.Label>Booking Confirmation Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your code"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
              </Form.Group>
              <div className="text-center mt-3">
                <Button variant="primary" onClick={handleSearch}>
                  Search Booking
                </Button>
              </div>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card>
        </Col>
      </Row>

      {bookingDetails && (
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="p-4 shadow-sm">
              <h3 className="mb-3">Booking Details</h3>
              <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
              <p><strong>Day of Week:</strong> {bookingDetails.dayOfWeek}</p>
              <p><strong>Start Time:</strong> {bookingDetails.startTime}</p>
              <p><strong>End Time:</strong> {bookingDetails.endTime}</p>

              <hr />
              <h4>Booker Details</h4>
              <p><strong>Name:</strong> {bookingDetails.user.name}</p>
              <p><strong>Email:</strong> {bookingDetails.user.email}</p>
              <p><strong>Phone:</strong> {bookingDetails.user.phoneNumber}</p>

              <hr />
              <h4>Facility Details</h4>
              <p><strong>Type:</strong> {bookingDetails.facility.facilityType}</p>
              <Image
                src={bookingDetails.facility.facilityPhotoUrl}
                fluid
                rounded
                alt="Facility"
                className="mt-2"
              />
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FindBookingPage;
