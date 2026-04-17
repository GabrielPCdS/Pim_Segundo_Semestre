using BioCiclo.App.Models;
using BioCiclo.App.Data;
using Microsoft.EntityFrameworkCore; // IMPORTANTE para o .Include()
using System;
using System.Linq;

using (var db = new BioCicloContext())
{
    Console.WriteLine("--- Consultando Dados do BioCiclo ---");

    // Buscamos o agendamento carregando (Include) os dados do Usuário e do Material
    var agendamento = db.Agendamentos
        .Include(a => a.Usuario)
        .Include(a => a.Material)
        .OrderByDescending(a => a.ID_Agendamento) // Pega o último criado
        .FirstOrDefault();

    if (agendamento != null)
    {
        Console.WriteLine($"Agendamento ID: {agendamento.ID_Agendamento}");
        Console.WriteLine($"Cliente: {agendamento.Usuario?.Nome}");
        Console.WriteLine($"Material: {agendamento.Material?.Descricao}");
        Console.WriteLine($"Peso: {agendamento.Peso_Kg}kg");
        Console.WriteLine($"Status: {agendamento.Status_Coleta}");
    }
    else
    {
        Console.WriteLine("Nenhum agendamento encontrado.");
    }
}