import { Link } from "react-router-dom";
const NoLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">You must be logged in to access this page</h2>
      <p className="text-gray-600 mt-4">Please <Link to="/login" className="text-blue-500">login</Link> to continue</p>
    </div>
  );
};

export default NoLogin;
