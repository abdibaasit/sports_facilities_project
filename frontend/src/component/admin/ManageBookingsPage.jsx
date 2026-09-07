import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup } from 'react-bootstrap';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode &&
                booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Manage Bookings</h2>

            <Form className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="🔍 Search by Booking Code..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </InputGroup>
            </Form>

            <Row>
                {currentBookings.map((booking) => (
                    <Col md={6} lg={4} key={booking.id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>
                                    <Badge bg="primary">#{booking.bookingConfirmationCode}</Badge>
                                </Card.Title>
                                <Card.Text><strong>Day of Week:</strong> {booking.dayOfWeek}</Card.Text>
                                <Card.Text><strong>Start Time:</strong> {booking.startTime}</Card.Text>
                                <Card.Text><strong>End Time:</strong> {booking.endTime}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-white border-top-0">
                                <Button
                                    variant="success"
                                    onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                    className="w-100"
                                >
                                    Manage Booking
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                facilitiesPerPage={bookingsPerPage}
                totalFacilities={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </Container>
    );
};

export default ManageBookingsPage;
