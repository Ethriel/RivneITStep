using System;
using System.Collections.Generic;

namespace ModelsDTO.Models.Result
{
    public class ErrorResultDTO : ResultDTO
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
