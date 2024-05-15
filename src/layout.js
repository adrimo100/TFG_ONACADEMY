import {BrowserRouter, Route, Routes} from "react-router-dom";
import injectContext from "./store/context";
import { Home, Register, Login } from "./views";
import { Navbar } from "./components"
import { Footer } from "./components/footer/footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {

    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default injectContext(Layout);
