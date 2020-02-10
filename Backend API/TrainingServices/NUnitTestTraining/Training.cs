using NUnit.Framework;
using TrainingServices.Controllers;

namespace Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
            TrainingController tc = new TrainingController();
            tc.Add();
        }

        [Test]
        public void Test1()
        {

            Assert.Pass();
        }
    }
}