import { HubConnection } from "@microsoft/signalr";
import moment from "moment";
import { useEffect, useState } from "react";

interface MessageProps {
  HubConnection: HubConnection
}

const list: string[] = [];

const Messages = (messageProps: MessageProps) => {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
      messageProps.HubConnection.on("sendToClient", (message: string) => {
          setDate(new Date());
          list.push(`${moment().format("DD/MM/YYYY")}: ${message}`);
      });
  }, []);

  return (<>
    {list.map((message, index) => <p key={`message${index}`}>{message}</p>)}
  </>);
}
export default  Messages