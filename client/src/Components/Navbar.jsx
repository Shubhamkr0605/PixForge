import { useNavigate } from "react-router-dom";

const Navbar = ({ credits }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#020617] border-b border-white/10">

      <h1 className="text-teal-400 font-bold text-xl">
        PixForge
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-300">
          Credits: {credits}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;