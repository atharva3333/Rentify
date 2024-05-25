
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80">
        
        {user ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Seller Details</h2>
            
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button
          onClick={onClose}
          className=" text-white hover:text-gray-50 px-6 py-2 rounded-md flex justify-center mx-auto mt-10 bg-red-600"
        >
         Close
        </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
