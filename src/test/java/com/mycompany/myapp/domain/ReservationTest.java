package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.EmployeeTestSamples.*;
import static com.mycompany.myapp.domain.PaymentTestSamples.*;
import static com.mycompany.myapp.domain.ReservationTestSamples.*;
import static com.mycompany.myapp.domain.RoomTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReservationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reservation.class);
        Reservation reservation1 = getReservationSample1();
        Reservation reservation2 = new Reservation();
        assertThat(reservation1).isNotEqualTo(reservation2);

        reservation2.setId(reservation1.getId());
        assertThat(reservation1).isEqualTo(reservation2);

        reservation2 = getReservationSample2();
        assertThat(reservation1).isNotEqualTo(reservation2);
    }

    @Test
    void paymentTest() {
        Reservation reservation = getReservationRandomSampleGenerator();
        Payment paymentBack = getPaymentRandomSampleGenerator();

        reservation.setPayment(paymentBack);
        assertThat(reservation.getPayment()).isEqualTo(paymentBack);

        reservation.payment(null);
        assertThat(reservation.getPayment()).isNull();
    }

    @Test
    void roomTest() {
        Reservation reservation = getReservationRandomSampleGenerator();
        Room roomBack = getRoomRandomSampleGenerator();

        reservation.setRoom(roomBack);
        assertThat(reservation.getRoom()).isEqualTo(roomBack);

        reservation.room(null);
        assertThat(reservation.getRoom()).isNull();
    }

    @Test
    void responsibleTest() {
        Reservation reservation = getReservationRandomSampleGenerator();
        Employee employeeBack = getEmployeeRandomSampleGenerator();

        reservation.setResponsible(employeeBack);
        assertThat(reservation.getResponsible()).isEqualTo(employeeBack);

        reservation.responsible(null);
        assertThat(reservation.getResponsible()).isNull();
    }
}
