import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FaHome, FaVideo } from 'react-icons/fa';
import { VscGitStashApply } from 'react-icons/vsc';
import LandingPageModal from './LandingPageModel';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);

  const generateRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 10) + 1; // Generates a number between 1 and 11
    return `assets/${imageNumber}.jpg`; // Assuming your images are stored in the public/images folder
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://rentify-1-xlg3.onrender.com/all-properties');
        const propertiesWithImages = response.data.slice(0, 6).map(property => ({
          ...property,
          imageUrl: generateRandomImage()
        }));
        setProperties(propertiesWithImages);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleShowDetailsClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="bg-gray-900 text-white h-screen">
        <Navbar />
        <div className="flex justify-around mt-12 items-center">
          <div className="w-3/5">
            <h1 className="text-8xl font-bold mb-4">
              Discover Your <br /> Dream Property
            </h1>
            <p className="text-2xl mb-8 w-[600px]">
              Find your dream properties based on your budget and desired location easily on our site or share your properties for rent or sale.
            </p>
            <button className="bg-teal-500 hover:bg-teal-600 font-medium text-lg px-8 py-3 rounded-lg mt-12">
              <Link to="/register" className="text-white">
                Register
              </Link>
            </button>
          </div>
          <img src="/assets/hero.jpg" className="h-[70vh] rounded-t-full rounded-b-xl" alt="Hero" />
        </div>
      </div>
      <div className="mt-28">
        <h2 className="text-3xl font-black text-center">How it Works?</h2>
        <p className="text-center font-black text-6xl w-[1000px] mx-auto mt-12">
          Explore among <span className="text-orange-500">+5K</span> Houses and find what best fits you
        </p>

        <div className="flex justify-center my-24 gap-10">
          <div className="shadow-2xl p-10 rounded-3xl">
            <FaHome className="mx-auto text-2xl mt-3" />
            <p className="text-blue-800 font-bold text-center mt-5">Find an Apartment</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Find some of the best apartments currently on market</p>
          </div>
          <div className="shadow-2xl p-10 rounded-3xl">
            <FaVideo className="mx-auto text-2xl mt-3" />
            <p className="text-blue-800 font-bold text-center mt-5">Take Online Tour</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Explore properties virtually</p>
          </div>
          <div className="shadow-2xl p-10 rounded-3xl">
            <VscGitStashApply className="mx-auto text-2xl mt-3" />
            <p className="text-blue-800 font-bold text-center mt-5">Apply Online</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Easily apply for your desired property</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map(property => (
            <div key={property._id} className="border border-gray-400 rounded-lg p-4 max-w-xs mx-auto">
              <img src={property.imageUrl} alt={property.propertyName} className="w-full object-cover rounded-md mb-2" />
              <h2 className="text-xl font-semibold mb-2">{property.propertyName}</h2>
              <p>{property.address}</p>
              <p>{property.city}, {property.state}</p>
              <p className="font-bold text-lg">₹{property.price}</p>
              <button
                onClick={handleShowDetailsClick}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 font-semibold mt-2"
              >
                Show Seller&apos;s Details
              </button>
            </div>
          ))}
        </div>
      </div>
      <LandingPageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
