import Default from "../../../layout/Default";
import Login from "../Login";
import Register from "../Register";

export const AuthRouter = [
    {
        path: "/auth",
        element: <Default />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },

        ],
    },
];