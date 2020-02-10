using NUnit.Framework;
using TrainingDetails.DataAccess;
using TrainingServices.Core;
using TrainingServices.Helper;

namespace Tests
{
    public class Tests
    {
        public iDataAccess IAccess { get; }
        public IConfiguration IConfig { get; }

        public Tests(iDataAccess iAccess, IConfiguration iConfig)
        {
            IAccess = iAccess;
            IConfig = iConfig;
        }
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}