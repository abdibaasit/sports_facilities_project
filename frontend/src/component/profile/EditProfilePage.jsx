import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (!confirmed) return;

        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4">Edit Profile</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {!user ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading profile...</p>
                </div>
            ) : (
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title>Your Profile Details</Card.Title>
                        <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
                        <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                        <Card.Text><strong>Phone Number:</strong> {user.phoneNumber}</Card.Text>

                        <Button
                            variant="danger"
                            onClick={handleDeleteProfile}
                            className="mt-3"
                        >
                            Delete Profile
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default EditProfilePage;
