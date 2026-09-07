import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import ApiService from '../../service/ApiService';

const DEFAULT_FACILITY_TYPES = [
  'Football Pitch',
  'Basketball Court',
  'Tennis Court',
  'Badminton Court',
  'Swimming Pool',
  'Volleyball Court',
  'Gym / Fitness Studio',
  'Squash Court',
  'Padel Court',
  'Cricket Ground',
  'Table Tennis Room',
  'Futsal Court',
  'Athletics Track'
];

const FacilitySearch = ({ handleSearchResult }) => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [facilityTypes, setFacilityTypes] = useState(DEFAULT_FACILITY_TYPES);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFacilityTypes = async () => {
      try {
        const types = await ApiService.getFacilityTypes();
        const combined = Array.from(new Set([...DEFAULT_FACILITY_TYPES, ...(types || [])]));
        setFacilityTypes(combined);
      } catch (error) {
        console.error('Error fetching facility types:', error.message);
      }
    };
    fetchFacilityTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(''), timeout);
  };

  const handleInternalSearch = async () => {
    if (!dayOfWeek || !startTime || !endTime || !facilityType) {
      showError('Please select all fields');
      return;
    }

    try {
      const response = await ApiService.getAvailableFacilities(dayOfWeek, startTime, endTime, facilityType);
      if (response.statusCode === 200) {
        if (!response.data || response.data.length === 0) {
          showError('No facilities available for the selected options.');
          return;
        }
        handleSearchResult(response.data);
        setError('');
      } else {
        showError('Something went wrong while searching.');
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Unknown error occurred.';
      showError(message);
    }
  };

  return (
    <Container className="my-4 p-4 border rounded bg-light">
      <h4 className="mb-4">Search Available Facilities</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="formDayOfWeek">
              <Form.Label>Day of Week</Form.Label>
              <Form.Select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                <option value="">Select a day</option>
                {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formFacilityType">
              <Form.Label>Facility Type</Form.Label>
              <Form.Select value={facilityType} onChange={(e) => setFacilityType(e.target.value)}>
                <option value="">Select facility type</option>
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleInternalSearch}>
          Search Facilities
        </Button>
      </Form>
    </Container>
  );
};

export default FacilitySearch;
