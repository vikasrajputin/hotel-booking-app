package com.book.my.trip.status;

public enum ReviewTitle {

    EXCELLENT("Excellent"),
    VERY_GOOD("Very Good"),
    GOOD("Good");

    private final String displayName;

    ReviewTitle(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
