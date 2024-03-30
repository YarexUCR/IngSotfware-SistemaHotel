using Microsoft.EntityFrameworkCore;
using Domain.Model;

namespace Data.Data{
public class HotelData{

     public async Task<List<FotosHotel>> listarFotosHotel()
        {
            using (var _context = new If7100hotel2024Context())
            {
                return await _context.FotosHotel.ToListAsync();
            }
        }
}

}