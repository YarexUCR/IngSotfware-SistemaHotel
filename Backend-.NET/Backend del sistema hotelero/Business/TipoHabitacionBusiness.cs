using Data.Data;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class TipoHabitacionBusiness
    {

        private TipoHabitacionData tipoHabitacionData;
       public TipoHabitacionBusiness()
        {
            tipoHabitacionData = new TipoHabitacionData();
        }


        public async Task<List<TipoHabitacion>> listarTipoHabitacion()
        {
            return await tipoHabitacionData.listarTipoHabitacion();
        }



    }
}
