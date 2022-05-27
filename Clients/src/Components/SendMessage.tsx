import { useState } from "react";
import config from "../config/config";

const SendMessage = () => {

    const [message, setMessage] = useState("");

    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setMessage(event.target.value);
        }
    };

    const messageSubmit = (event: React.MouseEvent) => {
        if (event) {
            fetch(`${config.notiApiUrl}`, {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            });

            setMessage("");
        }
    };

    return (<>
        <label>Enter your Message</label>
        <input type="text" onChange={messageChange} value={message} />
        <button onClick={messageSubmit}>Add Message</button>
    </>);
}
export default  SendMessage