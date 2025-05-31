import { Settings } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-800 ml-10">web-hunting</h1>
        <button
          type="button"
          className="rounded-lg p-2 text-gray-400  hover:text-gray-600 transition-colors duration-200 mr-10"
        >
          <Settings size={25} />
        </button>
      </div>
    </div>
  );
};

export default Header;
