import {BrowserRouter, Route, Routes} from "react-router-dom";
import injectContext from "./store/context";
import { Home, Register, Login } from "./views";
import { Navbar } from "./components"
import { Footer } from "./components/footer/footer";
import { Toaster } from "react-hot-toast";

const lyoutStyles = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingBottom:"90px"
}

const Layout = () => {

    return (
        <div style={lyoutStyles}>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>s
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
