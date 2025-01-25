package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "room_number", nullable = false, unique = true)
    private Integer roomNumber;

    @NotNull
    @Column(name = "room_type", nullable = false)
    private String roomType;

    @NotNull
    @Column(name = "price_per_night", precision = 21, scale = 2, nullable = false)
    private BigDecimal pricePerNight;

    @NotNull
    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    @Column(name = "amenities")
    private String amenities;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Room id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoomNumber() {
        return this.roomNumber;
    }

    public Room roomNumber(Integer roomNumber) {
        this.setRoomNumber(roomNumber);
        return this;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return this.roomType;
    }

    public Room roomType(String roomType) {
        this.setRoomType(roomType);
        return this;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public BigDecimal getPricePerNight() {
        return this.pricePerNight;
    }

    public Room pricePerNight(BigDecimal pricePerNight) {
        this.setPricePerNight(pricePerNight);
        return this;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public Boolean getIsAvailable() {
        return this.isAvailable;
    }

    public Room isAvailable(Boolean isAvailable) {
        this.setIsAvailable(isAvailable);
        return this;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getAmenities() {
        return this.amenities;
    }

    public Room amenities(String amenities) {
        this.setAmenities(amenities);
        return this;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Room)) {
            return false;
        }
        return getId() != null && getId().equals(((Room) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", roomNumber=" + getRoomNumber() +
            ", roomType='" + getRoomType() + "'" +
            ", pricePerNight=" + getPricePerNight() +
            ", isAvailable='" + getIsAvailable() + "'" +
            ", amenities='" + getAmenities() + "'" +
            "}";
    }
}
