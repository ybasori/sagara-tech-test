import React from "react";
import "./styles.scss";

const Footer = () => {
    return (
        <div id="footer" className="mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col pt-5">
                        <div className="mx-auto" style={{ width: 200 }}>
                            &copy; copyright
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
