import React, { useEffect, useState }  from 'react';
import * as signalR from "@microsoft/signalr";
import './App.css';
const App: React.FC = () => {
  const url = "https://localhost:7238";
  const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${url}/hubs/notifications`)
  .build();
  
  hubConnection.start();

  var list: string[] = [];

  interface MessageProps {
    HubConnection: signalR.HubConnection
  }

  const Messages: React.FC<MessageProps> = (messageProps) => {

    const [date, setDate] = useState<Date>();

    useEffect(() => {
      messageProps.HubConnection.on("sendToClient", message => {
        list.push(message);
        setDate(new Date());
      })
    }, []);

    return <>{list.map((message, index) => <p key={`message${index}`}>{message}</p>)}</>
  }

  const SendMessage: React.FC = () => {

    const [message, setMessage] = useState("");

    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setMessage(event.target.value);
      }
    }

    const messageSubmit = (event: React.MouseEvent) => {
      if (event) {
        fetch(`${url}/api/Notification`, {
          "method": "POST",
          "headers": {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message
          })
        });

        setMessage("");
      }
    }

    return <><label>Enter your Message</label><input type="text" onChange={messageChange} value={message} /><button onClick={messageSubmit}>Add Message</button></>;
 
  }


  return <><SendMessage /><Messages HubConnection={hubConnection}></Messages></>
}
export default App;