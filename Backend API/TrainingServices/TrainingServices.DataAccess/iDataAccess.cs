using System.Collections.Generic;
using System.Text;
using TrainingServices.Core;

namespace TrainingDetails.DataAccess
{
    public interface iDataAccess
    {
        IEnumerable<Training> GetTrainingsByName(string name);
        IEnumerable<Training> GetAllTrainings();
        Training Create(Training training);
        void Delete(int Id);
        Training Update(Training training);
    }
}
