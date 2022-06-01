using Microsoft.AspNetCore.SignalR;

namespace Noti.Api.Hubs;

public class NotificationHub : Hub
{
    public async Task BroadcastToAll(string message)
    {
        await Clients.All.SendAsync("sendToClient", message);
    }

    public async Task BroadcastToGroup(string groupName, string message)
    {
        await Clients.Group(groupName)
            .SendAsync("sendToClient", $"{Context.ConnectionId} has joined the group {groupName}. \n {message}");
    }

    public async Task BroadcastToConnection(string connectionId, string message)
    {
        await Clients.Client(connectionId).SendAsync("sendToClient", message);
    }

    public async Task BroadcastToUser(string userId, string message)
    {
        await Clients.User(userId).SendAsync("sendToClient", message);
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync(Context.User?.Identity?.Name + " joined.");
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    public string GetConnectionId()
    {
        return Context.ConnectionId;
    }
}