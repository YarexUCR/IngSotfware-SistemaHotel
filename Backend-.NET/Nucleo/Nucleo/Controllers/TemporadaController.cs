using Dominio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReglasNegocio;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nucleo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemporadaController : ControllerBase
    {
        private readonly TemporadaReglaDeNegocio _temporadaReglaDeNegocio;

        public TemporadaController(TemporadaReglaDeNegocio temporadaReglaDeNegocio)
        {
            _temporadaReglaDeNegocio = temporadaReglaDeNegocio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Temporada>>> GetTemporadas()
        {
            var temporadas = await _temporadaReglaDeNegocio.GetAllTemporadasAsync();
            return Ok(temporadas);
        }

        [HttpGet("{fecha}")]
        public async Task<ActionResult<Temporada>> GetTemporadaByDate(DateTime fecha)
        {
            var temporada = await _temporadaReglaDeNegocio.GetTemporadaByDateAsync(fecha);

            if (temporada == null)
            {
                return NotFound();
            }

            return Ok(temporada);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> PostTemporada(Temporada temporada)
        {
            try
            {
                var result = await _temporadaReglaDeNegocio.AgregarTemporadaAsync(temporada);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutTemporada(int id, Temporada temporada)
        {
            if (id != temporada.ID_Temporada)
            {
                return BadRequest();
            }

            try
            {
                var result = await _temporadaReglaDeNegocio.UpdateTemporadaAsync(temporada);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteTemporada(int id)
        {
            var result = await _temporadaReglaDeNegocio.DeleteTemporadaAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
