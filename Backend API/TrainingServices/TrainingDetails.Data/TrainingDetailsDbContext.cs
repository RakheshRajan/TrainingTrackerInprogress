//using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using TrainingServices.Core;

namespace TrainingDetails.Data
{
    public class TrainingDetailsDbContext : DbContext
    {
        public TrainingDetailsDbContext(DbContextOptions<TrainingDetailsDbContext> options) : base()
        { }

        public DbSet<Training> Trainings { get; set; }
    }
}
