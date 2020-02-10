using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingDetails.DataAccess;
using TrainingServices.Core;

namespace TrainingServices.BussinessManager
{
    public class TrainingManager
    {
        public iDataAccess IAccess { get; }
        public IConfiguration IConfig { get; }

        public TrainingManager(iDataAccess iAccess, IConfiguration iConfig)
        {
            IAccess = iAccess;
            IConfig = iConfig;
        }

        public IEnumerable<Training> Filter(String name)
        {
            return IAccess.GetTrainingsByName(name);
        }

        public IEnumerable<Training> GetAllTrainings()
        {
            return IAccess.GetAllTrainings();
        }

        public ResultOutput Add(Training TData)
        {
            string message = string.Empty;
            ResultOutput ROutput = new ResultOutput();

            DateTime startDateTime;
            DateTime endDateTime;
            startDateTime = Convert.ToDateTime(TData.StartDate);
            endDateTime = Convert.ToDateTime(TData.EndDate);

            if (endDateTime > startDateTime)
            {
                TimeSpan ts = endDateTime - startDateTime;
                // Check if the training name exists - else proceed
                int count = IAccess.GetTrainingsByName(TData.Name).Count();
                if (count == 0)
                {
                    IAccess.Create(TData);
                    ROutput.isSuccess = true;
                    ROutput.Message = "Training added successfully. The training is for " + ts.Days + " days.";
                }
                else
                {
                    ROutput.Message = IConfig["ErrorCode1"].ToString();
                    ROutput.isSuccess = false;
                }
            }
            else
            {
                ROutput.Message = IConfig["ErrorCode2"].ToString();
                ROutput.isSuccess = false;
            }
            return ROutput;
        }
    }
}
