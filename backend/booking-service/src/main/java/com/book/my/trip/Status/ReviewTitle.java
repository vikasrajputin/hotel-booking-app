package com.book.my.trip.Status;

public enum ReviewTitle {

    EXCELLENT("Excellent"),
    VERY_GOOD("Very Good"),
    GOOD("Good"),
    NONE("None"); // Add this line

    private final String title;

    ReviewTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
