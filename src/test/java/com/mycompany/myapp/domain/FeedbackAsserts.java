package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class FeedbackAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFeedbackAllPropertiesEquals(Feedback expected, Feedback actual) {
        assertFeedbackAutoGeneratedPropertiesEquals(expected, actual);
        assertFeedbackAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFeedbackAllUpdatablePropertiesEquals(Feedback expected, Feedback actual) {
        assertFeedbackUpdatableFieldsEquals(expected, actual);
        assertFeedbackUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFeedbackAutoGeneratedPropertiesEquals(Feedback expected, Feedback actual) {
        assertThat(expected)
            .as("Verify Feedback auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFeedbackUpdatableFieldsEquals(Feedback expected, Feedback actual) {
        assertThat(expected)
            .as("Verify Feedback relevant properties")
            .satisfies(e -> assertThat(e.getFeedbackDate()).as("check feedbackDate").isEqualTo(actual.getFeedbackDate()))
            .satisfies(e -> assertThat(e.getRating()).as("check rating").isEqualTo(actual.getRating()))
            .satisfies(e -> assertThat(e.getComments()).as("check comments").isEqualTo(actual.getComments()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFeedbackUpdatableRelationshipsEquals(Feedback expected, Feedback actual) {
        assertThat(expected)
            .as("Verify Feedback relationships")
            .satisfies(e -> assertThat(e.getReservation()).as("check reservation").isEqualTo(actual.getReservation()));
    }
}
