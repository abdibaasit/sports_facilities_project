import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Alert,
    Image
} from 'react-bootstrap';

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

const AddFacilityPage = () => {
    const navigate = useNavigate();
    const [facilityDetails, setFacilityDetails] = useState({
        facilityPhotoUrl: '',
        facilityType: '',
        facilityName: '',
        facilityPrice: '',
        facilityDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [facilityTypes, setFacilityTypes] = useState(DEFAULT_FACILITY_TYPES);
    const [newFacilityType, setNewFacilityType] = useState(false);

    useEffect(() => {
        const fetchFacilityTypes = async () => {
            try {
                const types = await ApiService.getFacilityTypes();
                const combinedTypes = Array.from(new Set([...DEFAULT_FACILITY_TYPES, ...(types || [])]));
                setFacilityTypes(combinedTypes);
            } catch (error) {
                console.error('Error fetching facility types:', error.message);
            }
        };
        fetchFacilityTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacilityDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFacilityTypeChange = (e) => {
        const value = e.target.value;
        if (value === 'new') {
            setNewFacilityType(true);
            setFacilityDetails(prev => ({ ...prev, facilityType: '' }));
        } else {
            setNewFacilityType(false);
            setFacilityDetails(prev => ({ ...prev, facilityType: value }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const addFacility = async () => {
        if (!facilityDetails.facilityType || !facilityDetails.facilityName || !facilityDetails.facilityPrice || !facilityDetails.facilityDescription) {
            setError('All facility details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this facility?')) return;

        try {
            const formData = new FormData();
            formData.append('facilityType', facilityDetails.facilityType);
            formData.append('facilityName', facilityDetails.facilityName);
            formData.append('facilityPrice', facilityDetails.facilityPrice);
            formData.append('facilityDescription', facilityDetails.facilityDescription);
            if (file) formData.append('photo', file);

            const result = await ApiService.addFacility(formData);
            if (result.statusCode === 200) {
                setSuccess('Facility added successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-facilities');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4">Add New Facility</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={(e) => { e.preventDefault(); addFacility(); }}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formFile">
                            <Form.Label>Upload Facility Photo</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                thumbnail
                                fluid
                                className="mt-3"
                            />
                        )}
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Facility Type</Form.Label>
                            <Form.Select value={newFacilityType ? 'new' : facilityDetails.facilityType} onChange={handleFacilityTypeChange}>
                                <option value="">Select a facility type</option>
                                {facilityTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                                <option value="new">Other (please specify)</option>
                            </Form.Select>
                        </Form.Group>

                        {newFacilityType && (
                            <Form.Group className="mb-3">
                                <Form.Label>New Facility Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="facilityType"
                                    value={facilityDetails.facilityType}
                                    onChange={handleChange}
                                    placeholder="Enter new facility type"
                                />
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Facility Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="facilityName"
                        value={facilityDetails.facilityName}
                        onChange={handleChange}
                        placeholder="Enter facility name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Facility Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="facilityPrice"
                        value={facilityDetails.facilityPrice}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Facility Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="facilityDescription"
                        value={facilityDetails.facilityDescription}
                        onChange={handleChange}
                        placeholder="Enter facility description"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Add Facility
                </Button>
            </Form>
        </Container>
    );
};

export default AddFacilityPage;
