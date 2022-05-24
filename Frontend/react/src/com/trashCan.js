import '../App.css';
import React, { useState } from 'react';
function TrashCan({ type }) {
    type = type.toLowerCase();
    console.log(type);
    if (type === "paper") {
        return (
            <div>
                <img src="./blue.png"></img>
            </div>
        )
    }
    if (type === "cardboard") {
        return (
            <div>
                <img src="green.png"></img>
            </div>
        )
    }
    if (type === "metal") {
        return (
            <div>
                <img src="red.png"></img>
            </div>
        )
    }
    if (type === "plastic") {
        return (
            <div>
                <img src="./orange.png"></img>
            </div>
        )
    }
    return (
        <></>
    )
}
export default TrashCan;