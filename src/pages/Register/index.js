import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegister, resetPostRegister } from "../../_redux/auth";
import { getKota, getProvince, resetGetKota } from "../../_redux/wilayah";

const Register = () => {
    const dispatch = useDispatch();
    const { wilayah: wilayahState, auth: authState } = useSelector(
        (state) => state
    );

    const [oneTimeEffect, setOneTimeEffect] = useState(true);
    const [isSubmittedBefore, setIsSubmittedBefore] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        jenisKelamin: "",
        provinsi: "",
        kota: "",
    });
    const [errorForm, setErrorForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        jenisKelamin: "",
        provinsi: "",
        kota: "",
    });

    const onErrorForm = (newForm, cb) => {
        let newErrorForm = JSON.parse(JSON.stringify(errorForm));
        Object.keys(newForm).map((key) => {
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

    const onChangeProvinsi = (e) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });

        onErrorForm(
            { ...form, [e.currentTarget.name]: e.currentTarget.value },
            (err) => {
                dispatch(getKota(e.currentTarget.value));
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
        if (oneTimeEffect) {
            setOneTimeEffect(false);
            dispatch(getProvince());
        }
    }, [dispatch, oneTimeEffect]);

    useEffect(() => {
        if (isSubmitting) {
            dispatch(postRegister(form));
        }
    }, [dispatch, form, isSubmitting]);

    useEffect(() => {
        if (
            !authState.isLoadingPostRegister &&
            isSubmitting &&
            authState.register
        ) {
            alert("Successfully Registered!");
            setIsSubmitting(false);
            dispatch(resetPostRegister());
            dispatch(resetGetKota());
            setForm({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                jenisKelamin: "",
                provinsi: "",
                kota: "",
            });
        }

        if (
            !authState.isLoadingPostRegister &&
            isSubmitting &&
            authState.errorPostRegister
        ) {
            alert("Something went wrong!");
            setIsSubmitting(false);
            dispatch(resetPostRegister());
        }
    }, [
        authState.errorPostRegister,
        authState.isLoadingPostRegister,
        authState.register,
        dispatch,
        form,
        isSubmitting,
    ]);

    return (
        <div className="row" id="register">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h1>Register</h1>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="firstname"
                                    onChange={onChangeInput}
                                    value={form.firstname}
                                />
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="lastname"
                                    onChange={onChangeInput}
                                    value={form.lastname}
                                />
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.lastname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    onChange={onChangeInput}
                                    value={form.email}
                                />
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.email}
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
                                    onChange={onChangeInput}
                                    value={form.password}
                                />
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.password}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Jenis Kelamin
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="jenisKelamin"
                                    onChange={onChangeInput}
                                    value={form.jenisKelamin}
                                >
                                    <option hidden>Pilih Jenis Kelamin</option>
                                    <option value="1">Laki</option>
                                    <option value="2">Perempuan</option>
                                </select>
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore &&
                                        errorForm.jenisKelamin}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Provinsi
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="provinsi"
                                    onChange={onChangeProvinsi}
                                    disabled={
                                        !wilayahState.province ||
                                        wilayahState.province.length === 0 ||
                                        wilayahState.isLoadingGetProvince
                                    }
                                    value={form.provinsi}
                                >
                                    <option hidden>
                                        {wilayahState.isLoadingGetProvince
                                            ? "Loading ..."
                                            : "Pilih Provinsi"}
                                    </option>
                                    {wilayahState.province &&
                                        wilayahState.province.map(
                                            (item, index) => (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                </select>
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.provinsi}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Kota
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    disabled={
                                        !wilayahState.kota ||
                                        wilayahState.kota.length === 0 ||
                                        wilayahState.isLoadingGetKota
                                    }
                                    name="kota"
                                    onChange={onChangeInput}
                                    value={form.kota}
                                >
                                    <option hidden>
                                        {wilayahState.isLoadingGetKota
                                            ? "Loading ..."
                                            : "Pilih Kota"}
                                    </option>
                                    {wilayahState.kota &&
                                        wilayahState.kota.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                                <div id="emailHelp" className="form-text">
                                    {isSubmittedBefore && errorForm.kota}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Loading ..." : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
