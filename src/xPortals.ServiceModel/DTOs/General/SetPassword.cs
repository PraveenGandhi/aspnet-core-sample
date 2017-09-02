using ServiceStack;
using System;

namespace xPortals.DTOs.General
{
    public class SetPassword : IReturn<SetPasswordResponse>
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class SetPasswordResponse
    {
        public bool IsDone { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}
