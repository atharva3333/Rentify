import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Modal from './Modal';

const Home = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    price: ''
  });
  const [showEmails, setShowEmails] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 10) + 1;
    return `assets/${imageNumber}.jpg`;
  };

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await axios.get('https://rentify-1-xlg3.onrender.com/all-properties');
        const propertiesWithImages = response.data.map(property => ({
          ...property,
          imageUrl: generateRandomImage()
        }));
        setAllProperties(propertiesWithImages);
        setFilteredProperties(propertiesWithImages);
      } catch (error) {
        console.error('Error fetching all properties:', error);
      }
    };

    fetchAllProperties();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = allProperties;

      if (filters.city) {
        filtered = filtered.filter(property => property.city.toLowerCase().includes(filters.city.toLowerCase()));
      }

      if (filters.state) {
        filtered = filtered.filter(property => property.state.toLowerCase().includes(filters.state.toLowerCase()));
      }

      if (filters.price) {
        filtered = filtered.filter(property => property.price <= parseFloat(filters.price));
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, allProperties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`https://rentify-1-xlg3.onrender.com/user?email=${email}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const toggleEmailVisibility = (property) => {
    setShowEmails(prevState => ({
      ...prevState,
      [property._id]: !prevState[property._id]
    }));
    if (!showEmails[property._id]) {
      fetchUserDetails(property.email);
      setIsModalOpen(true);
    } else {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">All Properties</h1>
        <div className="mb-4 flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="border border-gray-400 rounded-md p-2"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleFilterChange}
            className="border border-gray-400 rounded-md p-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Max Price"
            value={filters.price}
            onChange={handleFilterChange}
            className="border border-gray-400 rounded-md p-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div key={property._id} className="border border-gray-400 rounded-lg p-4 max-w-xs mx-auto">
                <img src={property.imageUrl} alt={property.propertyName} className="w-full object-cover rounded-md mb-2"/>
                <h2 className="text-xl font-semibold mb-2">{property.propertyName}</h2>
                <p>{property.address}</p>
                <p>{property.city}, {property.state}</p>
                <p className='font-bold text-lg'>₹{property.price}</p>
                <button 
                  onClick={() => toggleEmailVisibility(property)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 font-semibold"
                >
                  {showEmails[property._id] ? 'Hide' : 'Show'} Seller&apos;s Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">No properties found.</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Home;
