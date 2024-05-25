import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaHome ,FaVideo} from "react-icons/fa";
import { VscGitStashApply } from "react-icons/vsc";
const LandingPage = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white h-screen">
        <Navbar />
        <div className="flex justify-around mt-12 items-center">
          <div className=" w-3/5">
            <h1 className="text-8xl font-bold mb-4">Discover Your <br/> Dream Property </h1>
            <p className="text-2xl mb-8 text-slate-500 w-[600px]">
              Find your dream properties based on your budget and desired location easily on our site or share 
              your properties for rent or sale
            </p>
            <button className=" bg-teal-500 hover:bg-teal-600 font-medium text-lg px-8 py-3 rounded-lg mt-20">
              <Link to="/register" className="text-white">
                Register
              </Link>
            </button>
          </div>
          <img src="/assets/hero.jpg" className="h-[70vh] rounded-t-full rounded-b-xl" />
        </div>
      </div>
      <div className=" mt-28">
        <h2 className="text-3xl font-black text-center">How it Works?</h2>
        <p className="text-center font-black text-6xl w-[1000px] mx-auto mt-12">Explore among <span className="text-orange-500">+5K </span> Houses and find what best fits you</p>

        <div className="flex justify-center my-24 gap-10">
          <div className="shadow-2xl p-10 rounded-3xl">
            <FaHome  className="mx-auto text-2xl mt-3"/>
            <p className="text-blue-800 font-bold text-center mt-5">Find an Appartment</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Find some of the best appartment currently on market</p>
          </div>
          <div className="shadow-2xl p-10 rounded-3xl">
            <FaVideo className="mx-auto text-2xl mt-3"/>
            <p className="text-blue-800 font-bold text-center mt-5">Take online Tour</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Find some of the best appartment currently on market</p>
          </div>
          <div className="shadow-2xl p-10 rounded-3xl">
          <VscGitStashApply className="mx-auto text-2xl mt-3"/>
            <p className="text-blue-800 font-bold text-center mt-5">Apply Online</p>
            <p className="text-gray-500 text-center w-[150px] mx-auto">Find some of the best appartment currently on market</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
