using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using JamTime.Backend.Core.Specifications;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Reservations.List;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Infrastructure.Queries;

public class ReservationQueryService(AppDbContext dbContext) : IReservationQueryService
{
  public async Task<IEnumerable<ReservationDTO>> ListAsync(int skip = 0, int take = 1000,
    CancellationToken ct = default)
  {
    var bands = dbContext.Bands;
    var rooms = dbContext.Rooms;

    var reservations = await dbContext.Reservations
      .WithSpecification(new ActiveReservationsSpec())
      .OrderByDescending(r => r.From)
      .Skip((skip) * take)
      .Take(take)
      .Join(bands,
        reservation => reservation.BandId,
        band => band.Id,
        (reservation, band) => new { reservation, band })
      .Join(rooms,
        combined => combined.reservation.RoomId,
        room => room.Id,
        (combined, room) => new { combined.reservation, combined.band, room }
      )
      .Select(r => new ReservationDTO
      {
        Id = r.reservation.Id,
        Band = new BandDTO { Id = r.band.Id, Name = r.band.Name },
        From = r.reservation.From,
        Room = new RoomDTO { Id = r.room.Id, Name = r.room.Name, Capacity = r.room.Capacity, Place = r.room.Place },
        Status = r.reservation.Status,
        To = r.reservation.To,
        Remark = r.reservation.Remark
      })
      .ToListAsync(ct);


    return reservations;
  }

  public async Task<IEnumerable<ReservationDTO>> ListByUserIdAsync(Guid userId, int skip, int take,
    CancellationToken ct = default)
  {
    var bands = dbContext.Bands;
    var rooms = dbContext.Rooms;
    var reservationDetails = dbContext.ReservationDetails;

    var reservations = await dbContext.Reservations
      .WithSpecification(new ActiveReservationsSpec())
      .OrderByDescending(r => r.From)
      .Skip((skip) * take)
      .Take(take)
      .Join(bands,
        reservation => reservation.BandId,
        band => band.Id,
        (reservation, band) => new { reservation, band })
      .Join(rooms,
        combined => combined.reservation.RoomId,
        room => room.Id,
        (combined, room) => new { combined.reservation, combined.band, room }
      )
      .Join(reservationDetails,
        valami => valami.reservation.Id,
        reservationDetail => reservationDetail.ReservationId,
        (valami, reservationDetail) => new { valami.reservation, valami.band, valami.room, reservationDetail }
      )
      .Where(i => i.reservationDetail.CreatorUserId == userId)
      .Select(r => new ReservationDTO
      {
        Id = r.reservation.Id,
        Band = new BandDTO { Id = r.band.Id, Name = r.band.Name },
        From = r.reservation.From,
        Room = new RoomDTO { Id = r.room.Id, Name = r.room.Name, Capacity = r.room.Capacity, Place = r.room.Place },
        Status = r.reservation.Status,
        To = r.reservation.To,
        Remark = r.reservation.Remark
      })
      .ToListAsync(ct);

    return reservations;
  }
}
