import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import CheckOut from "../pages/checkout";

function AppRouter () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<CheckOut />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;