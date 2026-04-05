namespace BioCiclo.App.Models
{
    // Cliente herda tudo de Usuario
    public class Cliente : Usuario
    {
        public void SolicitarColeta()
        {
            Console.WriteLine("Iniciando fluxo de agendamento de resíduos...");
        }
    }
}