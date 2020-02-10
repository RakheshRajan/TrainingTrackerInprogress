using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TrainingDetails.DataAccess;
using TrainingServices.Core;
using TrainingServices.BussinessManager;

namespace TrainingServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        public iDataAccess IAccess { get; }
        public IConfiguration IConfig { get; }

        public TrainingController(iDataAccess iAccess, IConfiguration iConfig)
        {
            IAccess = iAccess;
            IConfig = iConfig;
        }

        /// <summary>
        /// For adding new training data
        /// </summary>
        /// <param name="TData">Training class</param>
        /// <returns></returns>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Add([FromBody] Training TData)
        {
            string message = string.Empty;
            ResultOutput ROutput = new ResultOutput();
            try
            {
                TrainingManager TM = new TrainingManager(IAccess, IConfig);
                ROutput = TM.Add(TData);
                message = ROutput.Message;

                if (!ROutput.isSuccess)
                    return StatusCode(StatusCodes.Status400BadRequest, new { message = message });

                return StatusCode(StatusCodes.Status200OK, new { message = message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        /// <summary>
        /// For searching trainings based on a string
        /// </summary>
        /// <param name="name">Search Parameters</param>
        /// <returns></returns>
        [HttpGet("Filter/{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Filter(String name)
        {
            string message = string.Empty;
            try
            {
                var results = IAccess.GetTrainingsByName(name);
                return StatusCode(StatusCodes.Status200OK, results);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        /// <summary>
        /// Get all the trainings
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAllTrainings")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllTrainings()
        {
            string message = string.Empty;
            try
            {
                var results = IAccess.GetAllTrainings();
                return StatusCode(StatusCodes.Status200OK, results);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpGet("GetErrorMessage/{errorCode}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetErrorMessage(string errorCode)
        {
            string message = string.Empty;
            try
            {
                message = IConfig[errorCode].ToString();
                return StatusCode(StatusCodes.Status200OK, message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}