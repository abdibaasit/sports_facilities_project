import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import FacilityResult from '../common/FacilityResult';
import FacilitySearch from '../common/FacilitySearch';

const AllFacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [selectedFacilityType, setSelectedFacilityType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [facilitiesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to handle filtered results (search or type change)
  const filterFacilities = (type, sourceFacilities = facilities) => {
    if (type === '') {
      setFilteredFacilities(sourceFacilities);
    } else {
      const filtered = sourceFacilities.filter(
        (facility) => facility.facilityType === type
      );
      setFilteredFacilities(filtered);
    }
    setCurrentPage(1);
  };

  const handleFacilityTypeChange = (e) => {
    const type = e.target.value;
    setSelectedFacilityType(type);
    filterFacilities(type);
  };

  const handleSearchResult = (results) => {
    setFacilities(results);
    filterFacilities(selectedFacilityType, results);
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await ApiService.getAllFacilities();
        const allFacilities = response.facilityList;
        setFacilities(allFacilities);
        setFilteredFacilities(allFacilities);
      } catch (error) {
        console.error('Error fetching facilities:', error.message);
        setError('Failed to load facilities.');
      } finally {
        setLoading(false);
      }
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

  // Pagination logic
  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilities = filteredFacilities.slice(indexOfFirstFacility, indexOfLastFacility);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">All Facilities</h2>

      {/* Filter Dropdown */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <label htmlFor="facilityType" className="form-label mb-0">
          Filter by Facility Type:
        </label>
        <select
          id="facilityType"
          className="form-select w-auto"
          value={selectedFacilityType}
          onChange={handleFacilityTypeChange}
        >
          <option value="">All</option>
          {facilityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <FacilitySearch handleSearchResult={handleSearchResult} />

      {/* Loader or Error */}
      {loading && <p>Loading facilities...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Results */}
      {!loading && currentFacilities.length === 0 && (
        <p className="text-muted">No facilities found for your search or filter.</p>
      )}

      {!loading && currentFacilities.length > 0 && (
        <>
          <FacilityResult facilitySearchResults={currentFacilities} />
          <Pagination
            facilitiesPerPage={facilitiesPerPage}
            totalFacilities={filteredFacilities.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default AllFacilitiesPage;
