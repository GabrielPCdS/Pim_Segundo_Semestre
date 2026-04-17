using Microsoft.EntityFrameworkCore;
using BioCiclo.App.Models;

namespace BioCiclo.App.Data
{
    public class BioCicloContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<MaterialReciclavel> Materiais { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Conexão com o seu SQL Express
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=BioCicloDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. Mapeamento de Tabelas (Sincronizado com seu print)
            modelBuilder.Entity<Usuario>().ToTable("Usuario");
            modelBuilder.Entity<Agendamento>().ToTable("Agendamentos");
            modelBuilder.Entity<MaterialReciclavel>().ToTable("Materiais");

            // 2. Mapeamento de Colunas de Ligação (Foreign Keys)
            // Ajustado para os nomes reais do seu banco: FK_Usuario e FK_Material
            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Usuario)
                .WithMany()
                .HasForeignKey("FK_Usuario");

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Material)
                .WithMany()
                .HasForeignKey("FK_Material");

            // 3. Configuração para o campo de peso (Decimal)
            modelBuilder.Entity<Agendamento>()
                .Property(a => a.Peso_Kg)
                .HasColumnType("decimal(10,2)");

            // 4. Configuração de Herança (Cliente e Cooperativa)
            modelBuilder.Entity<Usuario>()
                .HasDiscriminator<string>("Tipo_Usuario")
                .HasValue<Cliente>("Cliente")
                .HasValue<Cooperativa>("Cooperativa");
        }
    }
}