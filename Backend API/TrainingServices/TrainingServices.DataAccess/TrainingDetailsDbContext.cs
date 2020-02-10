//using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using TrainingServices.Core;

namespace TrainingDetails.DataAccess
{
    public class TrainingDetailsDbContext : DbContext
    {
        public TrainingDetailsDbContext(DbContextOptions<TrainingDetailsDbContext> options) : base(options)
        { }
        public DbSet<Training> Trainings { get; set; }
    }
}
