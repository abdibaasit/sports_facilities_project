import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Image,
  Card
} from 'react-bootstrap';

const EditFacilityPage = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [facilityDetails, setFacilityDetails] = useState({
    facilityPhotoUrl: '',
    facilityType: '',
    facilityPrice: '',
    facilityDescription: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await ApiService.getFacilityById(facilityId);
        setFacilityDetails({
          facilityPhotoUrl: response.facility.facilityPhotoUrl,
          facilityType: response.facility.facilityType,
          facilityPrice: response.facility.facilityPrice,
          facilityDescription: response.facility.facilityDescription,
        });
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchFacilityDetails();
  }, [facilityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacilityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('facilityType', facilityDetails.facilityType);
      formData.append('facilityPrice', facilityDetails.facilityPrice);
      formData.append('facilityDescription', facilityDetails.facilityDescription);
      if (file) formData.append('photo', file);

      const result = await ApiService.updateFacility(facilityId, formData);
      if (result.statusCode === 200) {
        setSuccess('Facility updated successfully.');
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

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete this facility?')) {
      try {
        const result = await ApiService.deleteFacility(facilityId);
        if (result.statusCode === 200) {
          setSuccess('Facility deleted successfully.');
          setTimeout(() => {
            setSuccess('');
            navigate('/admin/manage-facilities');
          }, 3000);
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <h2 className="mb-4 text-center">Edit Facility</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              {preview ? (
                <Image src={preview} fluid rounded />
              ) : facilityDetails.facilityPhotoUrl ? (
                <Image src={facilityDetails.facilityPhotoUrl} fluid rounded />
              ) : null}
              <Form.Label className="mt-2">Change Photo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Facility Type</Form.Label>
              <Form.Control
                type="text"
                name="facilityType"
                value={facilityDetails.facilityType}
                onChange={handleChange}
                placeholder="Enter facility type"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Price</Form.Label>
              <Form.Control
                type="number"
                name="facilityPrice"
                value={facilityDetails.facilityPrice}
                onChange={handleChange}
                placeholder="Enter facility price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="facilityDescription"
                value={facilityDetails.facilityDescription}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="success" onClick={handleUpdate}>
            Update Facility
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Facility
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default EditFacilityPage;
