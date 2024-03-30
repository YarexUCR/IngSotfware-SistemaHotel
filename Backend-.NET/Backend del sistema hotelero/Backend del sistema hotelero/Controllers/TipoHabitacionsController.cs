using Business;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend_del_sistema_hotelero.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoHabitacionsController : ControllerBase
    {
        [HttpGet]
        [Route("listarTipoHabitacion")]
        public async Task<List<TipoHabitacion>> listarTipoHabitacion()
        {
            return await (new TipoHabitacionBusiness().listarTipoHabitacion());
        }

    }
}
