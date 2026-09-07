import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            } 
            
        };

        fetchAdminName();
    }, []);

    return (
        <Container className="py-5">
            <Card className="shadow-sm text-center">
                <Card.Body>
                    <h2 className="mb-4">Welcome Admin, {adminName}</h2>
                    <Row className="justify-content-center">
                        <Col xs={12} md={6} lg={4} className="mb-3">
                            <Button
                                variant="primary"
                                className="w-100 py-3"
                                onClick={() => navigate('/admin/manage-facilities')}
                            >
                                🏢 Manage Facilities
                            </Button>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                            <Button
                                variant="success"
                                className="w-100 py-3"
                                onClick={() => navigate('/admin/manage-bookings')}
                            >
                                📅 Manage Bookings
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminPage;
