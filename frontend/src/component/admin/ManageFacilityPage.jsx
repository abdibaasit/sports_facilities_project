import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import FacilityResult from '../common/FacilityResult';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from 'react-bootstrap';

const ManageFacilityPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [selectedFacilityType, setSelectedFacilityType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [facilityPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await ApiService.getAllFacilities();
        const allFacilities = response.facilityList;
        setFacilities(allFacilities);
        setFilteredFacilities(allFacilities);
      } catch (error) {
        console.error('Error fetching facilities:', error.message);
      }
      setLoading(false);
    };

    const fetchFacilityTypes = async () => {
      try {
        const types = await ApiService.getFacilityTypes();
        setFacilityTypes(types);
      } catch (error) {
        console.error('Error fetching facility types:', error.message);
      }
    };

    fetchFacilities();
    fetchFacilityTypes();
  }, []);

  const handleFacilityTypeChange = (e) => {
    setSelectedFacilityType(e.target.value);
    filterFacilities(e.target.value);
  };

  const filterFacilities = (type) => {
    if (type === '') {
      setFilteredFacilities(facilities);
    } else {
      const filtered = facilities.filter(
        (facility) => facility.facilityType === type
      );
      setFilteredFacilities(filtered);
    }
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastFacility = currentPage * facilityPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilityPerPage;
  const currentFacilities = filteredFacilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col>
              <h3>Manage Facilities</h3>
            </Col>
            <Col md="auto">
              <Button onClick={() => navigate('/admin/add-facility')}>➕ Add Facility</Button>
            </Col>
          </Row>

          <Form.Group as={Row} className="mb-3" controlId="facilityTypeSelect">
            <Form.Label column sm={3}>Filter by Facility Type:</Form.Label>
            <Col sm={9}>
              <Form.Select value={selectedFacilityType} onChange={handleFacilityTypeChange}>
                <option value="">All</option>
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <FacilityResult facilitySearchResults={currentFacilities} />

              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  facilitiesPerPage={facilityPerPage}
                  totalFacilities={filteredFacilities.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageFacilityPage;
