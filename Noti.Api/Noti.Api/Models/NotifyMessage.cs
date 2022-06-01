namespace Noti.Api.Models
{
    public class NotifyMessage
    {
        public string Message { get; set; } = string.Empty;
        public string GroupName { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string ConnectionId { get; set; } = string.Empty;
        public string All { get; set; } = string.Empty;
    }
}
