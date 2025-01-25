package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class FeedbackTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Feedback getFeedbackSample1() {
        return new Feedback().id(1L).rating(1).comments("comments1");
    }

    public static Feedback getFeedbackSample2() {
        return new Feedback().id(2L).rating(2).comments("comments2");
    }

    public static Feedback getFeedbackRandomSampleGenerator() {
        return new Feedback().id(longCount.incrementAndGet()).rating(intCount.incrementAndGet()).comments(UUID.randomUUID().toString());
    }
}
