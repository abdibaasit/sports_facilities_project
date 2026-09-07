import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const FacilityResult = ({ facilitySearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    return (
        <section className="my-4">
            {facilitySearchResults && facilitySearchResults.length > 0 && (
                <Container>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {facilitySearchResults.map((facility) => (
                            <Col key={facility.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        // variant="top"
                                        // src={facility.facilityPhotoUrl}
                                        // alt={facility.facilityType}
                                        // style={{ height: "200px", objectFit: "cover" }}
                                        variant="top"
                                        src={`http://localhost:4040${facility.facilityPhotoUrl}`}
                                        alt={facility.facilityType}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{facility.facilityType}</Card.Title>
                                        <Card.Text>
                                            <strong>Price:</strong> ${facility.facilityPrice} / hour<br />
                                            <strong>Description:</strong> {facility.facilityDescription}
                                        </Card.Text>
                                        {isAdmin ? (
                                            <Button
                                                variant="warning"
                                                onClick={() => navigate(`/admin/edit-facility/${facility.id}`)}
                                            >
                                                Edit Facility
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={() => navigate(`/facility-details-book/${facility.id}`)}
                                            >
                                                View / Book Now
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </section>
    );
};

export default FacilityResult;
