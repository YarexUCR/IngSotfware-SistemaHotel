using Microsoft.EntityFrameworkCore;
using Domain.Model;


namespace Data.Data
{
    public class TipoHabitacionData
    {
        public async Task<List<TipoHabitacion>> listarTipoHabitacion()
        {
            using (var _context = new If7100hotel2024Context())
            {
                return await _context.TipoHabitacions.ToListAsync();
            }
        }

    }
}
