using ServiceStack;
using System;

namespace xPortals.DTOs.Leasing
{
    public class LeaseTermination : IReturn<LeaseTerminationResponse>
    {
        public string Type { get; set; }
        public Guid? Id { get; set; }
    }

    public class LeaseTerminationResponse
    {
        public DateTime LeaseExpiryDate { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }

    public class LeaseTerminationPost : IReturn<LeaseTerminationPostResponse>
    {
        public string Type { get; set; }
        public Guid? Id { get; set; }
        public string Reason { get; set; }
        public string OtherReason { get; set; }
        public DateTime TerminationDate { get; set; }
    }

    public class LeaseTerminationPostResponse
    {
        public DateTime LeaseExpiryDate { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}