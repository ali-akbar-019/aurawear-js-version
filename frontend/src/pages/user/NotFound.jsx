import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4">
            <div className="text-center max-w-md">
                {/* 404 Illustration Placeholder */}
                <div className="mb-6">
                    <img
                        src="/404.png"
                        alt="404 - Page Not Found"
                        className="w-64 mx-auto"
                    />
                </div>

                <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-500 mb-6">
                    Oops! The page you are looking for doesn't exist. Maybe you typed the URL wrong or the page has moved.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary/80 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
