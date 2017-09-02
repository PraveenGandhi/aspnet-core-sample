using System;

namespace xPortals.Exceptions.General
{
    public class InvalidVerificationCode : ArgumentException
    {
        public InvalidVerificationCode(string message):base(message)
        {

        }
    }
}
