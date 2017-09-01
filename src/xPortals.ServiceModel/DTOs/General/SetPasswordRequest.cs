using ServiceStack;
using System;

namespace xPortals.DTOs.General
{
    public class SetPasswordRequest : IReturn<Boolean>
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
