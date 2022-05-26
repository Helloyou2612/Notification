import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";

var list: string[] = [];

  interface MessageProps {
    HubConnection: HubConnection
  }

  function Messages({ messageProps }: { messageProps: MessageProps; }): JSX.Element {

    const [date, setDate] = useState<Date>();
    useEffect(() => {
        messageProps.HubConnection.on("sendToClient", (message: string) => {
            setDate(new Date());
            list.push(`${date}: ${message}`);
        });
    }, []);

    return <>{list.map((message, index) => <p key={`message${index}`}>{message}</p>)}</>;
}
export default  Messages