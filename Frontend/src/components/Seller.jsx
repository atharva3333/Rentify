import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdHomeWork, MdEdit, MdDelete   } from "react-icons/md";
const Seller = () => {
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  const userId = localStorage.getItem('userId');
  console.log(userId);

  const toggleAddPropertyForm = () => {
    setShowAddPropertyForm(!showAddPropertyForm);
  };

  const generateRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 11) + 1; // Generates a number between 1 and 11
    return `assets/${imageNumber}.jpg`; // Assuming your images are stored in the public/images folder
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          const response = await axios.get(`https://rentify-1-xlg3.onrender.com/properties?email=${email}`);
          const propertiesWithImages = response.data.map(property => ({
            ...property,
            imageUrl: generateRandomImage()
          }));
          setProperties(propertiesWithImages);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      }
    };

    fetchProperties();
  }, [showAddPropertyForm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { propertyName, address, city, state, price } = event.target.elements;
    const email = localStorage.getItem('email'); // Assuming localStorage is available
    const data = {
      email: email,
      propertyName: propertyName.value,
      address: address.value,
      city: city.value,
      state: state.value,
      price: price.value,
      imageUrl: generateRandomImage()
    };

    try {
      if (editingProperty) {
        const response = await axios.put(`https://rentify-1-xlg3.onrender.com/properties/${editingProperty._id}`, data);
        setProperties(properties.map(property => (property._id === editingProperty._id ? response.data : property)));
      } else {
        const response = await axios.post('https://rentify-1-xlg3.onrender.com/properties', data);
        setProperties([...properties, response.data]);
      }
      event.target.reset();
      setShowAddPropertyForm(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowAddPropertyForm(true);
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`https://rentify-1-xlg3.onrender.com/properties/${propertyId}`);
      setProperties(properties.filter(property => property._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div>
  <Navbar />
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Seller Account</h1>
    <div className='text-center flex justify-center items-center gap-4'>
      <button onClick={toggleAddPropertyForm} className="bg-green-500 flex gap-2 items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold mr-4"> <IoMdAddCircleOutline className='text-2xl'/> Add Your Property for Rent</button>
      <button onClick={toggleAddPropertyForm} className="bg-blue-500 flex gap-2 items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold"><MdHomeWork className='text-2xl'/>Your Properties</button>
    </div>
    {showAddPropertyForm && (
      <div>
        <h2 className="text-xl font-semibold mb-4">{editingProperty ? 'Edit Property' : 'Add Your Property for Rent'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="propertyName" className="block text-lg font-semibold mb-2">Property Name:</label>
            <input type="text" id="propertyName" name="propertyName" defaultValue={editingProperty?.propertyName || ''} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-semibold mb-2">Address:</label>
            <input type="text" id="address" name="address" defaultValue={editingProperty?.address || ''} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-lg font-semibold mb-2">City:</label>
            <input type="text" id="city" name="city" defaultValue={editingProperty?.city || ''} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-lg font-semibold mb-2">State:</label>
            <input type="text" id="state" name="state" defaultValue={editingProperty?.state || ''} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-lg font-semibold mb-2">Price:</label>
            <input type="number" id="price" name="price" defaultValue={editingProperty?.price || ''} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold">Submit</button>
        </form>
      </div>
    )}
    {!showAddPropertyForm && (
      <div>
        <h2 className="text-2xl font-semibold my-4 text-center">Your Properties</h2>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
            {properties.map(property => (
              <div key={property._id} className="border border-gray-400 rounded-md p-4">
                <img src={property.imageUrl} alt={property.propertyName} className="w-full h-48 object-cover rounded-md mb-2" />
                <p><strong>Property Name:</strong> {property.propertyName}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>City:</strong> {property.city}</p>
                <p><strong>State:</strong> {property.state}</p>
                <p><strong>Price:</strong> {property.price}</p>
                <div className='flex justify-center gap-4 mt-4'>
                <button onClick={() => handleEdit(property)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-semibold mr-2 flex gap-1 items-center justify-center"><MdEdit className='text-2xl'/> Edit</button>
                <button onClick={() => handleDelete(property._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 font-semibold flex gap-2 items-center justify-center"><MdDelete className='text-2xl'/> Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default Seller;
