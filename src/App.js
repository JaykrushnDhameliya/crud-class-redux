import './App.css';
import Form from "./component/Form";
import Navbar from "./component/Navbar";
import Two from "./component/Two"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Edit from "./component/Edit";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Form/>}></Route>
                <Route path="/Two/:id" element={<Two/>}></Route>
                <Route path="/edit/:id" element={<Edit/>}></Route>

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </>
    );
}

export default App;
