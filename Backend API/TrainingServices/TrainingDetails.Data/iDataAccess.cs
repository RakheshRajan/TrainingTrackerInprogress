using System.Collections.Generic;
using System.Text;
using TrainingServices.Core;

namespace TrainingDetails.Data
{
    public interface iDataAccess
    {
        Training GetTrainingById(int Id);
        Training Create(Training training);
        void Delete(int Id);
        Training Update(Training training);
    }
}
