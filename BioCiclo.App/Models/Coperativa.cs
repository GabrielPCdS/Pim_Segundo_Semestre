namespace BioCiclo.App.Models
{
    // Cooperativa também herda de Usuario para acessar credenciais [cite: 11]
    public class Cooperativa : Usuario
    {
        public Cooperativa()
        {
            // Define o tipo conforme a restrição CHECK do SQL Server 
            Tipo_Usuario = "Cooperativa";
        }

        public void ConfirmarColeta()
        {
            // Essencial para atualizar o 'Status_Coleta' na tabela 'Agendamentos'
            Console.WriteLine("Confirmando recebimento de material reciclável e atualizando indicadores...");
        }
    }
}