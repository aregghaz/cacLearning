import React, { useState, useEffect } from "react";

function TypingComponent({ textToType, delay, loop }) {
    const [text, setText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex < textToType.length) {
            setTimeout(() => {
                setText(text + textToType[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, delay);
        } else if (loop) {
            //Wait a second
            setTimeout(() => {
                // reset the text and the index
                setText("");
                setCurrentIndex(0);
            }, 3000);
        }
    }, [currentIndex]);
    return <div>{text}</div>;
}

export default TypingComponent
