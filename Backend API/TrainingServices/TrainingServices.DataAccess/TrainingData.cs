using System;
using System.Linq;
using System.Collections.Generic;
using TrainingServices.Core;

namespace TrainingDetails.DataAccess
{
    public class TrainingData : iDataAccess
    {
        private readonly TrainingDetailsDbContext db;

        public TrainingData(TrainingDetailsDbContext db)
        {
            this.db = db;
        }
        public Training Create(Training newTraining)
        {
            db.Trainings.Add(newTraining);
            db.SaveChanges();
            return newTraining;
        }
        public void Delete(int Id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Training> GetAllTrainings()
        {
            var results = from r in db.Trainings                          
                          select r;

            return results;
        }
        public IEnumerable<Training> GetTrainingsByName(string name)
        {
            var results = from r in db.Trainings
                          where r.Name.Contains(name) || string.IsNullOrEmpty(name)
                          orderby r.Name
                          select r;

            return results;
        }
        public Training Update(Training training)
        {
            throw new NotImplementedException();
        }
    }
}
