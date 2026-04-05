namespace BioCiclo.App.Models
{
    // Cooperativa também herda de Usuario
    public class Cooperativa : Usuario
    {
        public void ConfirmarColeta()
        {
            Console.WriteLine("Confirmando recebimento de material reciclável...");
        }
    }
}