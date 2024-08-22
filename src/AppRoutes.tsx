import {ReactNode} from "react";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";


const createRoute = (path: string, element: ReactNode) => ({path, element});

const routes = [
    createRoute("/", <HomePage />),
    createRoute("/home", <HomePage />),
]

const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {routes.map(({path, element}) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </Layout>
        </Router>
    )
}

export default AppRoutes;