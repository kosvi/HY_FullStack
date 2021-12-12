import React from "react";

interface Props {
    message: string;
}

const ErrorMessage = ({message}: Props) => {
    return (
        <div style={{"fontSize": "2em", "border": "solid 2px red", "padding": "1em", "backgroundColor": "pink"}}>
            {message}
        </div>
    );
};

export default ErrorMessage;
