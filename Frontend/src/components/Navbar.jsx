import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 px-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-3xl flex items-center gap-4">
        <img src = 'assets/logo.png' className='w-[10%]'/>
        Rentify.</Link>
        <div className="flex items-center gap-12">
          {location.pathname === '/home' && (
            <Link to="/seller" className="text-white hover:text-gray-300"><button className="text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold">Switch to Seller</button></Link>
          )}
          {location.pathname === '/seller' && (
            <Link to="/home" className="text-white hover:text-gray-300"><button className="text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold">Switch to User</button></Link>
          )}
          {location.pathname !== '/home' && location.pathname !== '/seller' && (
            <>
              <Link to="/login" className="text-white bg-teal-500 px-6 py-3 rounded-lg hover:bg-gray-800 border-teal-500 border-2 font-semibold">Login</Link>
              <Link to="/register" className="text-white rounded-lg font-semibold border-teal-500 border-2 hover:bg-teal-500 px-6 py-3">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
