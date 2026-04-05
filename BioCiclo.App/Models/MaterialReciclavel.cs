using System;

namespace BioCiclo.App.Models
{
    public class MaterialReciclavel
    {
        // PK - Identificador único do material
        public int ID_Material { get; set; }

        // Descrição (Ex: Papelão, Vidro, Plástico)
        public string Descricao { get; set; }

        // Construtor padrão
        public MaterialReciclavel() { }

        // Construtor auxiliar para facilitar a criação
        public MaterialReciclavel(int id, string descricao)
        {
            ID_Material = id;
            Descricao = descricao;
        }
    }
}