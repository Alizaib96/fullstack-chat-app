import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
      <AlertCircle className="w-16 h-16 mb-4 text-red-500" />
      <h1 className="mb-2 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-400">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
