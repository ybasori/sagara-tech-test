import React from "react";
import { useSelector } from "react-redux";
import Register from "../Register";

const Home = () => {
    const authState = useSelector((state) => state.auth);
    return (
        <div id="home">
            {!authState.auth ? (
                <Register />
            ) : (
                <>Hello, {authState.auth.email}</>
            )}
        </div>
    );
};

export default Home;
