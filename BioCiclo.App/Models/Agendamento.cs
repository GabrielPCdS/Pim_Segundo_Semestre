using System;
using System.ComponentModel.DataAnnotations;

namespace BioCiclo.App.Models
{
    public class Agendamento
    {

        [Key]
        public int ID_Agendamento { get; set; }
        public DateTime Data_Agendamento { get; set; }
        public string Status_Coleta { get; set; } = "Pendente"; 

        public MaterialReciclavel Material { get; set; }

        public decimal Peso_Kg { get; set; } 
        public string Endereco_Coleta { get; set; } = string.Empty;

        // Chaves Estrangeiras (FK) do seu banco
        public int FK_Usuario { get; set; }
        public int FK_Material { get; set; }
        public Cliente Usuario { get; internal set; }
    }
}