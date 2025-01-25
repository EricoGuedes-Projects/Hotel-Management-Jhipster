package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.Payment;
import com.mycompany.myapp.domain.Reservation;
import com.mycompany.myapp.domain.Room;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.EmployeeDTO;
import com.mycompany.myapp.service.dto.PaymentDTO;
import com.mycompany.myapp.service.dto.ReservationDTO;
import com.mycompany.myapp.service.dto.RoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reservation} and its DTO {@link ReservationDTO}.
 */
@Mapper(componentModel = "spring")
public interface ReservationMapper extends EntityMapper<ReservationDTO, Reservation> {
    @Mapping(target = "payment", source = "payment", qualifiedByName = "paymentPaymentMethod")
    @Mapping(target = "room", source = "room", qualifiedByName = "roomRoomNumber")
    @Mapping(target = "responsible", source = "responsible", qualifiedByName = "employeeFirstName")
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    ReservationDTO toDto(Reservation s);

    @Named("paymentPaymentMethod")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "paymentMethod", source = "paymentMethod")
    PaymentDTO toDtoPaymentPaymentMethod(Payment payment);

    @Named("roomRoomNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "roomNumber", source = "roomNumber")
    RoomDTO toDtoRoomRoomNumber(Room room);

    @Named("employeeFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    EmployeeDTO toDtoEmployeeFirstName(Employee employee);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
