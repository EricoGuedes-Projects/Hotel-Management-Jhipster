package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.PaymentTestSamples.*;
import static com.mycompany.myapp.domain.ReservationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Payment.class);
        Payment payment1 = getPaymentSample1();
        Payment payment2 = new Payment();
        assertThat(payment1).isNotEqualTo(payment2);

        payment2.setId(payment1.getId());
        assertThat(payment1).isEqualTo(payment2);

        payment2 = getPaymentSample2();
        assertThat(payment1).isNotEqualTo(payment2);
    }

    @Test
    void reservationTest() {
        Payment payment = getPaymentRandomSampleGenerator();
        Reservation reservationBack = getReservationRandomSampleGenerator();

        payment.setReservation(reservationBack);
        assertThat(payment.getReservation()).isEqualTo(reservationBack);
        assertThat(reservationBack.getPayment()).isEqualTo(payment);

        payment.reservation(null);
        assertThat(payment.getReservation()).isNull();
        assertThat(reservationBack.getPayment()).isNull();
    }
}
