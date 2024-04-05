using Business;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend_del_sistema_hotelero.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        [HttpGet]
        [Route("listarFotosHotel")]
        public async Task<List<FotosHotel>> listarFotosHotel()
        {
            return await (new HotelBusiness().listarFotosHotel());
        }

    } 
}
