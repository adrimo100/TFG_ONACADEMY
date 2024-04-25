import {BrowserRouter, Route, Routes} from "react-router-dom";
import injectContext from "./store/context";

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Hola</h1>}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default injectContext(Layout);
