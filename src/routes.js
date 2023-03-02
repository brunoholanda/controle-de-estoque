import ScrollToTop from "components/ScrollToTop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Cadastro from "./pages/Cadastro";
import { Fragment } from "react";
import useAuth from "hooks/useAuth";

const Private = ({Item}) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Fragment>
                <Routes>
                    <Route exact path="/inicio" element={<Private Item={Inicio} />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default AppRoutes;