import React from "react";

export default function Loading({ title }) {
    return (
        <div className="loading-container">
            <div className="loading">
                <img src="https://res.cloudinary.com/ufostart-development/image/upload/v1689982703/ECOMMERCE/mckaustcnmrms3nxvhzx.gif" alt="" />
                <label>{title}</label>
            </div>
        </div>
    )
}