import React from "react";

export default function Message({ title }) {
    return (
        <div>
            <div className="list-empty" >
                <br />
                <br />
                <br />
                <label className="message">{title}</label>
            </div>
        </div>
    )
}