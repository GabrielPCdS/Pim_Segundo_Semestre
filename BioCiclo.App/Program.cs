using BioCiclo.App.Models;
using BioCiclo.App.Data; // Importante para encontrar o Contexto
using System;

// Inicia a conexão com o banco
using (var db = new BioCicloContext())
{
    Console.WriteLine("--- Iniciando Fluxo Completo BioCiclo ---");

    try
    {
        // 1. Instancia o Cliente
        var novoCliente = new Cliente
        {
            Nome = "Mercado do Gabriel",
            Email = "contato@mercado.com",
            Senha = "123",
            Tipo_Usuario = "Cliente"
        };

        // 2. Instancia o Material
        var metal = new MaterialReciclavel { Descricao = "Latas de Aluminio" };

        // 3. Cria o Agendamento vinculando os objetos acima
        var agendamento = new Agendamento
        {
            Data_Agendamento = DateTime.Now.AddDays(2),
            Status_Coleta = "Pendente",
            Peso_Kg = 15.50m,
            Endereco_Coleta = "Rua da Reciclagem, 100",
            Usuario = novoCliente,
            Material = metal
        };

        // Adiciona o agendamento (o EF salvará o Cliente e o Material automaticamente)
        db.Agendamentos.Add(agendamento);

        // Executa a gravação no SQL Server
        db.SaveChanges();

        Console.WriteLine("Sucesso! Cliente, Material e Agendamento salvos em conjunto no BioCicloDB.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro ao processar: {ex.Message}");
        if (ex.InnerException != null)
        {
            Console.WriteLine($"Detalhe técnico: {ex.InnerException.Message}");
        }
    }
}