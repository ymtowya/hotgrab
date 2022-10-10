package com.example.trendRecord.service;

import com.example.trendRecord.entity.Trend;

import java.util.List;

public interface TrendService {

    List<Integer> getYears();

    List<Integer> getDatesOnYear(Integer year);

    List<Integer> getTimesOnDate(Integer year, Integer date);

    List<Trend> getTrendsOnTime(Integer year, Integer date, Integer time);

    List<Trend> getPositionsOfTrend(Integer year, Integer date, String trendName);
}
