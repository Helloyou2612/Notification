using Noti.Api.Models;
using Microsoft.AspNetCore.SignalR;


namespace Noti.Api.Hubs
{
    //refer: https://labs.sogeti.com/create-a-simple-real-time-notification-with-net-core-reactjs-and-signalr/
    public class NotiHub : Hub
    {
        public async Task SendMessage(NotifyMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
