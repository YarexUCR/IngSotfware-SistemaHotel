import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";
import { SobreNosotrosComponent } from "./sobre-nosotros/sobre-nosotros.component";
import { ContactenosComponent } from "./contactenos/contactenos.component";
import { FacilidadesComponent } from "./facilidades/facilidades.component";
import { TarifasComponent } from "./tarifas/tarifas.component";

export const routes : Routes =[
    {path: "", component :  InicioComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "contactenos", component : ContactenosComponent},
    {path: "facilidades", component : FacilidadesComponent},
    {path: "tarifas", component : TarifasComponent}



]
