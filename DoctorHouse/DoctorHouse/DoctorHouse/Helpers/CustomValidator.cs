﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace DoctorHouse.Helpers
{
    public class CustomValidator
    {
        public static IDictionary<string, string> GetErrorsByModel(ModelStateDictionary modelErrors)
        {
            var errors = new Dictionary<string, string>();

            var errorList = modelErrors.Where(x => x.Value.Errors.Count > 0)
                                       .ToDictionary(kvp => kvp.Key,
                                                     kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()[0]);
            var key = default(string);
            foreach (var item in errorList)
            {
                key = item.Key;
                key = char.ToLower(key[0]).ToString() + key.Substring(1);
                errors.Add(key, item.Value);
            }
            return errors;
        }

        public static IDictionary<string, string> GetErrorsByIdentityResult(IdentityResult result)
        {
            var errors = result.Errors
                               .ToDictionary(kvp => "invalid",
                                             kvp => kvp.Description);
            return errors;
        }
    }
}
