import Home from "./pages/Home";
import Players from "./pages/Players";
import MyTeam from "./pages/MyTeam.tsx";
import Teaminfo from "./pages/TeamInfo.tsx";
import Navbar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";

import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <>
                    <main>
                        <Navbar></Navbar>
                        <Outlet />
                        <Footer></Footer>
                    </main>
                </>
            ),
            children: [
                { element: <Home />, path: "/" },
                { element: <Players />, path: "/players" },
                { element: <MyTeam />, path: "/my-team" },
                { element: <Teaminfo />, path: "/:id" },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
