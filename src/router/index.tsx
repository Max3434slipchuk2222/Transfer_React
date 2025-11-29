import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import CityPage from "../pages/City"
import CreateCity from "../Modals/CreateCity/index";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "city", element: <CityPage />},
            { path: "city/create", element: <CreateCity /> }
        ],
    },
]);