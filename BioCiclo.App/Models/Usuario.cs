using System;
using System.ComponentModel.DataAnnotations;

namespace BioCiclo.App.Models
{
    // Esta classe representa a tabela 'Usuario' do seu banco de dados
    public class Usuario
    {
        // PK - identificador único
        [Key]
        public int ID_Usuario { get; set; }

    //Nome completo ou Razão Social
    public string Nome { get; set; } = string.Empty;

        // Emailunico para login
        public string Email { get; set; } = string.Empty;

        //senha sera tratatada com segurança
        public string Senha { get; set; } = string.Empty;

        // Tipo: 'Cliente' ou 'Coperativa' (Conforme sua regra de Check)
        public string Tipo_Usuario { get; set; } =string.Empty;

        // Construtor básico
        public Usuario() { }
    }
}
