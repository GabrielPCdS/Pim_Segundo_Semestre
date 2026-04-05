using System;

namespace BioCiclo.App.Models
{
    public class Agendamento
    {
        public int ID_Agendamento { get; set; }
        public DateTime Data_Agendamento { get; set; }
        public string Status_Coleta { get; set; } = "Pendente";

        // Chaves Estrangeiras (FK) do seu banco
        public int FK_Usuario { get; set; }
        public int FK_Material { get; set; }
    }
}