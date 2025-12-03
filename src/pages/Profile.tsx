import { useAuth } from "../context/AuthContext";
import APP_ENV from "../env";

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return <div className="text-center mt-10">Завантаження...</div>;
    const imageUrl = user.image.startsWith("http")
        ? user.image
        : `${APP_ENV.API_BASE_URL}/images/${user.image}`;

    const finalImage = user.image ? imageUrl : "https://via.placeholder.com/150";

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className=" md:flex-shrink-0  flex items-center justify-center md:w-48">
                        <img
                            className="h-48 w-full object-cover md:w-48"
                            src={finalImage}
                            alt={user.firstName}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }}
                        />
                    </div>
                    <div className="p-8 w-full">
                        <div className={"flex flex-row gap-2"}>
                            <h1 className="block mt-1 text-2xl leading-tight font-medium text-black">
                                {user.firstName}
                            </h1>
                            <h1 className="block mt-1 text-2xl leading-tight font-medium text-black">
                                {user.lastName}
                            </h1>
                        </div>


                        <p className="mt-2 text-gray-500">
                            {user.email}
                        </p>

                        <div className="mt-4">
                            <span className="text-gray-700 font-bold">Ролі: </span>
                            {user.roles.map((role, index) => (
                                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                                    {role}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                Вийти з акаунту
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;