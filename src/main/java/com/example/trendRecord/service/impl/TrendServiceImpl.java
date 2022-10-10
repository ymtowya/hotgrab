package com.example.trendRecord.service.impl;

import com.example.trendRecord.entity.TimeLabel;
import com.example.trendRecord.entity.Trend;
import com.example.trendRecord.mapper.TrendMapper;
import com.example.trendRecord.service.TrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrendServiceImpl implements TrendService {

    @Autowired
    private TimeLabel timeLabel;

    @Autowired
    private TrendMapper trendMapper;


    @Override
    public List<Integer> getYears() {
        return this.trendMapper.getYears();
    }

    @Override
    public List<Integer> getDatesOnYear(Integer year) {
        return this.trendMapper.getDatesOnYear(year.toString());
    }

    @Override
    public List<Integer> getTimesOnDate(Integer year, Integer date) {
        // return this.trendMapper.getTimesFromDb(this.timeLabel.yearDateToString(year, date));
        return this.trendMapper.getTimesOnDate(this.timeLabel.yearToString(year), this.timeLabel.dateToString(date));
    }

    @Override
    public List<Trend> getTrendsOnTime(Integer year, Integer date, Integer time) {
        return this.trendMapper.getTrendsOnTime(this.timeLabel.yearToString(year),
                                                this.timeLabel.dateToString(date),
                                                this.timeLabel.timeToString(time));
    }

    @Override
    public List<Trend> getPositionsOfTrend(Integer year, Integer date, String trendName) {
        return this.trendMapper.getPositionsOfTrend(this.timeLabel.yearToString(year),
                                                    this.timeLabel.dateToString(date),
                                                    trendName);
    }
}
