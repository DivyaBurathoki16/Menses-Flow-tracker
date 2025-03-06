import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const CherryBlossoms = () => {
    return (
        <div className="cherry-container">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="cherry-blossom"></div>
            ))}
        </div>
    );
};

ReactDOM.render(
    <>
        <CherryBlossoms />
        <App />
    </>,
    document.getElementById("root")
);
