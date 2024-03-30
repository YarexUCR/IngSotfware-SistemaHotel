using Data.Data;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBusiness{

    public class HotelBusiness{
    
    private HotelData hotelData;
    public HotelBusiness(){
        hotelData = new HotelData();
    }


    public async Task<List<FotosHotel>> listarFotosHotel(){
        return await hotelData.listarFotosHotel();
    }

    }
}