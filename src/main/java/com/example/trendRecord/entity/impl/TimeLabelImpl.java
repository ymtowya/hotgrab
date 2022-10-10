package com.example.trendRecord.entity.impl;

import com.example.trendRecord.entity.TimeLabel;
import org.springframework.stereotype.Component;

@Component
public class TimeLabelImpl implements TimeLabel {

    @Override
    public String yearToString(Integer year) {
        return String.format("%04d", year);
    }

    @Override
    public String dateToString(Integer date) {
        return String.format("%04d", date);
    }

    @Override
    public String yearDateToString(Integer year, Integer date) {
        return 'T' + this.yearToString(year) + this.dateToString(date);
    }

    @Override
    public String timeToString(Integer time) {
        return time.toString();
    }

}
