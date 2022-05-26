import './App.css';
import React, { useEffect, useState }  from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import url from './config/config';

const App: React.FC = () => {
  const hubConnection = new HubConnectionBuilder()
  .withUrl(`${url}/hubs/notifications`)
  .build();
  
  hubConnection.start();

  var list: string[] = [];

  interface MessageProps {
    HubConnection: HubConnection
  }

  function Messages(messageProps: MessageProps): JSX.Element {

    const [date, setDate] = useState<Date>();

    useEffect(() => {
      messageProps.HubConnection.on("sendToClient", message => {
        list.push(`${date}: ${message}`);
        setDate(new Date());
      });
    }, []);

    return <>
      {
        list.map((message, index) => {
          return <p key={`message${index}`}>{message}</p>;
        })
      }
    </>;
  }

  function SendMessage(): JSX.Element {

    const [message, setMessage] = useState("");

    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setMessage(event.target.value);
      }
    };

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
    };

    return <>
      <label>Enter your Message</label>
      <input type="text" onChange={messageChange} value={message} />
      <button onClick={messageSubmit}>Add Message</button>
    </>;
  }


  return <>
    <SendMessage />
    <Messages HubConnection={hubConnection}></Messages>
  </>
}
export default App;