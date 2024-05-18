import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";
import { SobreNosotrosComponent } from "./sobre-nosotros/sobre-nosotros.component";
import { ContactenosComponent } from "./contactenos/contactenos.component";
import { FacilidadesComponent } from "./facilidades/facilidades.component";
import { TarifasComponent } from "./tarifas/tarifas.component";
import { DisponibleComponent } from "./disponible/disponible.component";
import { ComoLlegarComponent } from "./como-llegar/como-llegar.component";
import { LoginComponent } from "./login/login.component";
import { ListaOfertasComponent } from "./admin/lista-ofertas/lista-ofertas.component";

import { HomeComponent } from "./admin/home/home.component";
import { ModificarPaginasComponent } from "./admin/modificar-paginas/modificar-paginas.component";
import { ListadoReservacionesComponent } from "./admin/listado-reservaciones/listado-reservaciones.component";
import { AdministrarHabitacionesComponent } from "./admin/administrar-habitaciones/administrar-habitaciones.component";
import { VerEstadoHotelHoyComponent } from "./admin/ver-estado-hotel-hoy/ver-estado-hotel-hoy.component";
import { ConsultarDisponibilidadHabitacionesComponent } from "./admin/consultar-disponibilidad-habitaciones/consultar-disponibilidad-habitaciones.component";
import { PublicidadAdminComponent } from "./admin/publicidad-admin/publicidad-admin.component";

import { ReservacionRealizadaComponent } from "./reservacion-realizada/reservacion-realizada.component";
import { Component } from "@angular/core";
import { CargarTipoHabitacionComponent } from "./admin/cargar-tipo-habitacion/cargar-tipo-habitacion.component";

export const routes : Routes =[
    {path: "admin/modificarPaginas", component : ModificarPaginasComponent},
    {path: "admin/listadoReservaciones", component : ListadoReservacionesComponent},
    {path: "admin/administrarHabitaciones", component : AdministrarHabitacionesComponent},
    {path: "admin/verEstadoHotelHoy", component : VerEstadoHotelHoyComponent},
    {path: "admin/consultarDisponibilidadHabitaciones", component : ConsultarDisponibilidadHabitacionesComponent},
    {path: "admin/publicidadAdmin", component : PublicidadAdminComponent},
    {path: "login", component :  LoginComponent},
    {path: "disponible", component :  DisponibleComponent},
    {path: "", component :  InicioComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "comollegar", component: ComoLlegarComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "contactenos", component : ContactenosComponent},
    {path: "facilidades", component : FacilidadesComponent},
    {path: "tarifas", component : TarifasComponent},
    {path: "admin/home", component : HomeComponent},
    {path: "admin/listaOferta", component : ListaOfertasComponent},
    {path: "admin/cargarTipoHabitacion", component: CargarTipoHabitacionComponent},
    {path: "reserva-realizada", component: ReservacionRealizadaComponent},

    { path: '**', component: InicioComponent }
    
]
