using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Noti.Api.Hubs;
using Noti.Api.Models;

namespace Noti.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly IHubContext<NotificationHub> _notificationContext;

    public NotificationController(IHubContext<NotificationHub> notificationContext)
    {
        _notificationContext = notificationContext;
    }

    [HttpPost]
    public async Task<IActionResult> Post(NotifyMessage model)
    {
        if (!string.IsNullOrEmpty(model.GroupName))
        {
            await _notificationContext.Clients.Groups(model.GroupName).SendAsync("sendToClient", model.Message);
        }
        else if (!string.IsNullOrEmpty(model.UserId))
        {
            await _notificationContext.Clients.Client(model.UserId).SendAsync("sendToClient", model.Message);
        }
        else if (!string.IsNullOrEmpty(model.ConnectionId))
        {
            await _notificationContext.Clients.Client(model.ConnectionId).SendAsync("sendToClient", model.Message);
        }
        else if(model.All == "ALL")
        {
            await _notificationContext.Clients.All.SendAsync("sendToClient", model.Message);
        }

        return Ok();
    }
}