using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace ModelsDTO.Helpers
{
    public class ModelStateCustomValidator
    {
        public static IEnumerable<string> GetErrorsFromModel(ModelStateDictionary stateDictionary)
        {
            var errors = new List<string>();

            var errorsList = stateDictionary.Where(sd => sd.Value.Errors.Any())
                                            .ToDictionary(v => v.Key, v => v.Value.Errors.Select(x => x.ErrorMessage).ToArray()[0]);

            foreach (var error in errorsList)
            {
                errors.Add(error.Value);
            }

            return errors;
        }

        public static IEnumerable<string> GetErrorsFromIdentityResult(IEnumerable<IdentityError> identityErrors)
        {
            var errors = new List<string>();

            foreach (var error in identityErrors)
            {
                errors.Add(error.Description);
            }

            return errors;
        }
    }
}
