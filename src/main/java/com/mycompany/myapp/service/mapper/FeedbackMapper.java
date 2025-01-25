package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Feedback;
import com.mycompany.myapp.domain.Reservation;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.FeedbackDTO;
import com.mycompany.myapp.service.dto.ReservationDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Feedback} and its DTO {@link FeedbackDTO}.
 */
@Mapper(componentModel = "spring")
public interface FeedbackMapper extends EntityMapper<FeedbackDTO, Feedback> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    @Mapping(target = "reservation", source = "reservation", qualifiedByName = "reservationCheckInDate")
    FeedbackDTO toDto(Feedback s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("reservationCheckInDate")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "checkInDate", source = "checkInDate")
    ReservationDTO toDtoReservationCheckInDate(Reservation reservation);
}
