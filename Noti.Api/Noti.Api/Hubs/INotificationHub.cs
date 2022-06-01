namespace Noti.Api.Hubs;

public interface INotificationHub
{
    Task BroadcastToAll(string message);
    Task BroadcastToGroup(string groupName, string message);
    Task BroadcastToConnection(string connectionId, string message);
    Task BroadcastToUser(string userId, string message);
    Task JoinGroup(string groupName);
    Task LeaveGroup(string groupName);
    string GetConnectionId();
}