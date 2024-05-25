import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LandingPageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Sign Up Required</h2>
        <p className="mb-6">Please sign up to view seller&apos;s details.</p>
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded mr-2">
          Close
        </button>
        <Link to="/register" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPageModal;
