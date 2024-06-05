using Datos;
using ReglasNegocio;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Registrar las clases ReglasNegocio
builder.Services.AddScoped<TipoDeHabitacionReglasNegocio>();
builder.Services.AddScoped<HabitacionReglasNegocio>();
builder.Services.AddScoped<OfertaReglaDeNegocio, OfertaReglaDeNegocio>();
builder.Services.AddScoped<HotelReglasNegocio, HotelReglasNegocio>();
builder.Services.AddScoped<OfertaDatos>();
builder.Services.AddScoped<ReservaReglasNegocio, ReservaReglasNegocio>();


// Configure CORS para ser consumido por la capa de interfaz grafica de angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Add CORS middleware
app.UseCors("AllowAngularDev");

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
