using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SampleApp.Models
{
    public partial class TripstarContext : DbContext
    {
        public virtual DbSet<TblBooking> TblBooking { get; set; }

        public virtual DbSet<TblBlocking> TblBlocking { get; set; }
        public virtual DbSet<TblHost> TblHost { get; set; }
        public virtual DbSet<TblPlaces> TblPlaces { get; set; }
        public virtual DbSet<TblReviews> TblReviews { get; set; }
        public virtual DbSet<TblUsers> TblUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Server=VINAY-PC\SQLEXPRESS;Database=Tripstar;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // new changes
            modelBuilder.Entity<TblBlocking>(entity =>
            {
                entity.HasKey(e => e.BlockingId)
                    .HasName("PK_Blocking");

                entity.ToTable("tbl_BlockRoom");

                entity.Property(e => e.BlockingId)
                    .HasColumnName("BlockId");


                entity.Property(e => e.BlockIn).HasColumnType("BlockIn");

                entity.Property(e => e.BlockOut).HasColumnType("BlockOut");

                entity.Property(e => e.HostId).HasColumnName("HostID");

                entity.Property(e => e.IsBlocked).HasColumnName("IsBlocked");

            });


            //
            modelBuilder.Entity<TblBooking>(entity =>
            {
                entity.HasKey(e => e.BookingId)
                    .HasName("PK_Booking");

                entity.ToTable("tbl_Booking");

                entity.Property(e => e.BookingId)
                    .HasColumnName("BookingID");
                    

                entity.Property(e => e.CheckIn).HasColumnType("datetime");

                entity.Property(e => e.CheckOut).HasColumnType("datetime");

                entity.Property(e => e.HostId).HasColumnName("HostID");

                entity.Property(e => e.UsreId).HasColumnName("UsreID");

                entity.HasOne(d => d.Host)
                    .WithMany(p => p.TblBooking)
                    .HasForeignKey(d => d.HostId)
                    .HasConstraintName("FK_tbl_Booking_host_HostID");

                entity.HasOne(d => d.Usre)
                    .WithMany(p => p.TblBooking)
                    .HasForeignKey(d => d.UsreId)
                    .HasConstraintName("FK_tbl_Booking_tbl_users_HostID");
            });

            modelBuilder.Entity<TblHost>(entity =>
            {
                entity.HasKey(e => e.HostId)
                    .HasName("PK_tbl_Host");

                entity.ToTable("tbl_Host");

                entity.Property(e => e.HostId).HasColumnName("HostID");

                entity.Property(e => e.Photo)
                    .IsRequired()
                    .HasColumnName("photo");

                entity.Property(e => e.PlaceId).HasColumnName("PlaceID");

                entity.Property(e => e.Price).HasColumnType("decimal");

                entity.Property(e => e.Roomtype)
                    .IsRequired()
                    .HasColumnType("varchar(100)");
                entity.Property(e => e.Review)
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.Type)
                   .IsRequired()
                   .HasColumnType("nvarchar(max)");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Place)
                    .WithMany(p => p.TblHost)
                    .HasForeignKey(d => d.PlaceId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_tbl_Host_Table_Places");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblHost)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_tbl_Host_tbl_places_HostID");
            });

            modelBuilder.Entity<TblPlaces>(entity =>
            {
                entity.HasKey(e => e.PlaceId)
                    .HasName("PK_Table_Places");

                entity.ToTable("tbl_Places");

                entity.Property(e => e.PlaceId).HasColumnName("PlaceID");
            });

            modelBuilder.Entity<TblReviews>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK_tbl_Reviews");

                entity.ToTable("tbl_Reviews");

                entity.Property(e => e.ReviewId)
                    .HasColumnName("ReviewID");
                    

                entity.Property(e => e.HostId).HasColumnName("HostID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Host)
                    .WithMany(p => p.TblReviews)
                    .HasForeignKey(d => d.HostId)
                    .HasConstraintName("FK_tbl_review_host_HostID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblReviews)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_tbl_review_tbl_users_HostID");
            });

            modelBuilder.Entity<TblUsers>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_tbl_Users");

                entity.ToTable("tbl_Users");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Address).HasColumnType("varchar(max)");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.EmailId).HasColumnName("EmailID");

                entity.Property(e => e.PreferredCurrency).HasColumnType("varchar(100)");
            entity.Property(e => e.Password).HasColumnType("varchar(100)");
                entity.Property(e => e.usertype).HasColumnType("varchar(50)");


                entity.Property(e => e.PreferredLanguage).HasMaxLength(100);

                entity.Property(e => e.Remarks).HasColumnType("varchar(max)");
            });
        }
    }
}