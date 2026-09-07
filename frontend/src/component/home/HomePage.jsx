import { useState } from "react";
import FacilityResult from "../common/FacilityResult";
import FacilitySearch from "../common/FacilitySearch";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Form,
} from "react-bootstrap";

const HomePage = () => {
  const [facilitySearchResults, setFacilitySearchResults] = useState([]);

  const handleSearchResult = (results) => {
    setFacilitySearchResults(results);
  };

  return (
    <div className="home">
      {/* BANNER */}
      <section className="position-relative">
        <img
          src="./assets/images/sportsFacility.jpg"
          alt="Facility Banner"
          className="w-100"
          style={{ height: "60vh", objectFit: "cover", filter: "brightness(60%)" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-primary"> SoomaPlay</span>
          </h1>
          <h3 className="fw-light">Book your favorite sports facility easily!</h3>
        </div>
      </section>

      {/* SEARCH */}
      <Container className="my-5">
        <FacilitySearch handleSearchResult={handleSearchResult} />
        <FacilityResult facilitySearchResults={facilitySearchResults} />
        <div className="text-center mt-4">
          <a href="/facilities" className="btn btn-outline-primary">
            View All Facilities
          </a>
        </div>
      </Container>

      {/* ABOUT US */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src="./assets/images/equipment-rehabilitation-interior-physiotherapy-clinic.jpg" alt="About" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h2>About <span className="text-primary"> SoomaPlay</span></h2>
            <p>
              SoomaPlay is an online platform designed to help users search and book
              sports facilities like football fields, basketball courts, and more. Whether
              you're organizing a match or training session, we make the booking process
              smooth and quick.
            </p>
            <Button variant="primary">Learn More</Button>
          </Col>
        </Row>
      </Container>

      {/* SERVICES */}
      <Container className="my-5">
  <h2 className="text-center mb-4">Our Facility Types</h2>
  <Row xs={1} md={2} lg={4} className="g-4">
    {[
      {
        img: "https://img.icons8.com/color/96/football2.png",
        title: "Football Fields",
        text: "Book 5-a-side or full-size pitches.",
      },
      {
        img: "https://img.icons8.com/color/96/basketball.png",
        title: "Basketball Courts",
        text: "Indoor & outdoor courts.",
      },
      {
        img: "https://img.icons8.com/color/96/gym.png",
        title: "Gyms",
        text: "Access fitness equipment & training spaces.",
      },
      {
        img: "https://img.icons8.com/color/96/swimming-pool.png",
        title: "Swimming Pools",
        text: "Clean, safe, and well-maintained pools.",
      },
    ].map((facility, index) => (
      <Col key={index}>
        <Card className="h-100 shadow-sm text-center">
          <Card.Img
            variant="top"
            src={facility.img}
            className="p-4"
            style={{ height: "150px", objectFit: "contain" }}
          />
          <Card.Body>
            <Card.Title>{facility.title}</Card.Title>
            <Card.Text>{facility.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      

      {/* TESTIMONIALS */}
      <Container className="my-5">
        <h2 className="text-center mb-4">What Users Say</h2>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <Card.Body>
                <Card.Text>
                  “SoomaPlay made booking our football matches so easy and reliable!”
                </Card.Text>
                <Card.Subtitle className="text-muted">– Mohamed A.</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <Card.Body>
                <Card.Text>
                  “Great interface and fast booking. I found a perfect gym nearby within minutes.”
                </Card.Text>
                <Card.Subtitle className="text-muted">– Hani I.</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
