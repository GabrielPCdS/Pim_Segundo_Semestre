using BioCiclo.App.Models;
using System;

using (var db = new BioCicloContext())
{
    Console.WriteLine("Conectando ao banco do BioCiclo...");

    var papelao = new MaterialReciclavel { Descricao = "Papelao" };
    db.Materiais.Add(papelao);
    db.SaveChanges();

    Console.WriteLine("Sucesso! Dados inseridos no SQL Server.");
}