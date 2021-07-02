import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postLogin, resetPostLogin } from "../../_redux/auth";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [isSubmittedBefore, setIsSubmittedBefore] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errorForm, setErrorForm] = useState({
        email: "",
        password: "",
    });

    const onErrorForm = (newForm, cb) => {
        let newErrorForm = JSON.parse(JSON.stringify(errorForm));
        Object.keys(newForm).map((key) => {
            if (key !== "rememberMe") {
                if (newForm[key] === "") {
                    newErrorForm = {
                        ...newErrorForm,
                        [key]: `${key} is required!`,
                    };
                } else if (
                    key === "email" &&
                    !/.+@.+\.[A-Za-z]+$/.test(newForm[key])
                ) {
                    newErrorForm = {
                        ...newErrorForm,
                        [key]: `${key} is invalid!`,
                    };
                } else {
                    newErrorForm = {
                        ...newErrorForm,
                        [key]: ``,
                    };
                }
            }
            return true;
        });
        cb(newErrorForm);
    };

    const onChangeInput = (e) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
        onErrorForm(
            { ...form, [e.currentTarget.name]: e.currentTarget.value },
            (err) => {
                setErrorForm(err);
            }
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmittedBefore(true);
        onErrorForm(form, (err) => {
            if (
                Object.keys(err).filter((key) => err[key] !== "").length === 0
            ) {
                setIsSubmitting(true);
            } else {
                setErrorForm(err);
            }
        });
    };

    useEffect(() => {
        if (isSubmitting) {
            dispatch(postLogin(form));
        }
    }, [dispatch, form, isSubmitting]);

    useEffect(() => {
        if (!authState.isLoadingPostLogin && isSubmitting && authState.auth) {
            alert("Successfully Logged in!");
            setIsSubmitting(false);
            history.push("/");
        }
        if (
            !authState.isLoadingPostLogin &&
            isSubmitting &&
            authState.errorPostLogin
        ) {
            alert("Something went wrong!");
            setIsSubmitting(false);
            dispatch(resetPostLogin());
        }
    }, [
        authState.isLoadingPostLogin,
        authState.auth,
        dispatch,
        form,
        history,
        isSubmitting,
        authState.errorPostLogin,
    ]);

    return (
        <div className="row" id="login">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h1>Login</h1>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    onKeyUp={onChangeInput}
                                />
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    onKeyUp={onChangeInput}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    name="rememberMe"
                                    onChange={onChangeInput}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                >
                                    Remember Me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Loading ..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
