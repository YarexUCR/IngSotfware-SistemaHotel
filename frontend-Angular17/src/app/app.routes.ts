import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";

export const routes : Routes =[
    {path: "dashboard", component :  DashboardComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "", component :  InicioComponent}
]
