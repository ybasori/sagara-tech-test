import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./_redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    return (
        <Provider store={store}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Navbar />
                <div className="container pt-5">
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </div>
        </Provider>
    );
}

export default App;
