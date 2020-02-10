using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainingServices.Core
{
    public class Training
    {
        private int _id;
        private string _name;
        private DateTime _endDate;
        private DateTime _startDate;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }
        public DateTime StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }
        public DateTime EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }
    }
}
