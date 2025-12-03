import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Header() {
    const { isAuth, user } = useAuth()
    return (
        <header className="p-4 bg-blue-600 text-white">
            <nav className="flex gap-4 items-baseline">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/city" className="hover:underline">City</Link>
                {isAuth && user ? (
                    <div className="flex float-end">
                        <Link to="/profile" className="flex items-center gap-2">
                            <span className="text-sm font-medium">{user.firstName}</span>
                            {user.image && (
                                <img
                                    src={user.image.startsWith('http') ? user.image : `http://localhost:5254/images/${user.image}`}
                                    alt="Avatar"
                                    className="h-8 w-8 rounded-full object-cover border-2 border-white"
                                />
                            )}
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link to="/register" className="hover:underline">
                            Register
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}