using Dominio;
using Microsoft.AspNetCore.Mvc;
using ReglasNegocio;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nucleo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly ReservaReglaDeNegocio _reservaReglaDeNegocio;

        public ReservasController(ReservaReglaDeNegocio reservaReglaDeNegocio)
        {
            _reservaReglaDeNegocio = reservaReglaDeNegocio;
        }

        [HttpGet("{cliente}")]
        public async Task<ActionResult<List<Reserva>>> ObtenerReserva(string cliente)
        {
            try
            {
                var reservas = await _reservaReglaDeNegocio.ObtenerReservasAsync(cliente);
                return Ok(reservas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las reservas: {ex.Message}");
            }
        }




        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> UpdateBorradoLogicoReserva(int id)
        {
            try
            {
                var result = await _reservaReglaDeNegocio.ActualizarBorradoLogicoReservaAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el borrado lógico de la reserva: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> ObtenerReservas()
        {
            try
            {
                var reservas = await _reservaReglaDeNegocio.ObtenerReservaAsync();
                return Ok(reservas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las reservas: {ex.Message}");
            }
        }
    }
}
