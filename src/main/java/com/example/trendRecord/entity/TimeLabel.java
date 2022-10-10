package com.example.trendRecord.entity;

import java.util.regex.Pattern;

public interface TimeLabel {

    static boolean isNumeric(String str) {
        Pattern patter = Pattern.compile("[0-9]*");
        return patter.matcher(str).matches();
    }

    String yearToString(Integer year);
    String dateToString(Integer date);
    String yearDateToString(Integer year, Integer date);

    String timeToString(Integer time);
}
