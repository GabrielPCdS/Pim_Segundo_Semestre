using System;

namespace BioCiclo.App.Models
{
    // Esta classe representa a tabela 'Usuario' do seu banco de dados
    internal class Usuario
    {
    // PK - identificador único
    public int ID_Usuario { get; set; }

    //Nome completo ou Razão Social
    public string Nome { get; set; }

    // Emailunico para login
    public string Email { get; set; }

        //senha sera tratatada com segurança
     public string _senha;
      public string Senha
       {
         get { return "********"; } // Proteção visual da senha
        }

     // Tipo: 'Cliente' ou 'Coperativa' (Conforme sua regra de Check)
     public string Tipo_Usuario { get; set; }

        // Construtor básico
        public Usuario() { }
    }
}
