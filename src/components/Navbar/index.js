import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPostLogin } from "../../_redux/auth";

const Navbar = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const onLogout = () => {
        dispatch(resetPostLogin());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img
                        src="https://getbootstrap.com//docs/5.0/assets/brand/bootstrap-logo.svg"
                        alt=""
                        width="30"
                        height="24"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${isOpen && "show"}`}
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {authState.auth ? (
                                <>
                                    <button
                                        onClick={onLogout}
                                        className="nav-link active"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="nav-link active">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
