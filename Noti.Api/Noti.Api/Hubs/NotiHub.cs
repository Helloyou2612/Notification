using Noti.Api.Models;
using Microsoft.AspNetCore.SignalR;


namespace Noti.Api.Hubs
{
    public class NotiHub : Hub
    {
        public async Task SendMessage(NotifyMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
