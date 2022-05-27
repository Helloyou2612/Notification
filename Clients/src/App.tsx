import './App.css';
import React, { useEffect, useState }  from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import config from './config/config';
import SendMessage from './Components/SendMessage';
import Messages from './Components/Messages';

const App: React.FC = () => {
  const hubConnection = new HubConnectionBuilder()
  .withUrl(`${config.notiHubUrl}`)
  .withAutomaticReconnect()
  .build();
  
  hubConnection.start()
  .then(function(){ console.log(`Now connected, connection id= ${hubConnection.connectionId}`); })
  .catch(function (error) { console.log(`Error: ${error}`) });
  
  return <>
    <SendMessage />
    <Messages HubConnection={hubConnection}></Messages>
  </>
}
export default App;