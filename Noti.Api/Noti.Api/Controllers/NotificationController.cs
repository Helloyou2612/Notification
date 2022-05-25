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
    public async Task<IActionResult> Post(NotifyMessage message)
    {
        await _notificationContext.Clients.All.SendAsync("sendToClient", message.Message);

        return Ok();
    }
}