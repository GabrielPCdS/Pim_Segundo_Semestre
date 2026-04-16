using Microsoft.EntityFrameworkCore;
namespace BioCiclo.App.Models
{
    public class BioCicloContext : DbContext
    {
        // Define as tabelas do banco baseadas nas suas classes
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<MaterialReciclavel> Materiais { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // String de conexão para o SQL Server
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=BioCicloDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações específicas baseadas no seu dicionário de dados

            // 1. Configura o Peso_Kg para DECIMAL(10,2) conforme o documento 
            modelBuilder.Entity<Agendamento>()
                .Property(a => a.Peso_Kg)
                .HasColumnType("decimal(10,2)");

            // 2. Garante que o Email seja Único conforme o documento 
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // 3. Mapeia a hierarquia de Usuários (Tabela Única)
            modelBuilder.Entity<Usuario>()
                .HasDiscriminator<string>("Tipo_Usuario")
                .HasValue<Cliente>("Cliente")
                .HasValue<Cooperativa>("Cooperativa");
        }
    }
}