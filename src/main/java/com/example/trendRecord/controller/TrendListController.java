package com.example.trendRecord.controller;

import com.example.trendRecord.entity.Trend;
import com.example.trendRecord.service.TrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trends")
@CrossOrigin
public class TrendListController {

    @Autowired
    private TrendService trendService;

    @GetMapping("/errors")
    public String errorPage() {
        return "error";
    }

    @RequestMapping("/trends")
    public List<Trend> getTrends(@RequestParam(value = "year", required = true) Integer year,
                                 @RequestParam(value = "date", required = true) Integer date,
                                 @RequestParam(value = "time", required = true) Integer time) {
        return this.trendService.getTrendsOnTime(year, date, time);
    }

    @RequestMapping("/times")
    public List<Integer> getAllTimes(@RequestParam("year") Integer year,
                                     @RequestParam("date") Integer date) {
        return this.trendService.getTimesOnDate(year, date);
    }

    @RequestMapping("/dates")
    public List<Integer> getAllDates(@RequestParam("year") Integer year) {
        return this.trendService.getDatesOnYear(year);
    }

    @RequestMapping("/positions")
    public List<Trend> getPositions(@RequestParam(value = "year") Integer year,
                                    @RequestParam("date") Integer date,
                                    @RequestParam("trendName") String trendName){
        return this.trendService.getPositionsOfTrend(year, date, trendName);
    }

    @GetMapping("/years")
    public List<Integer> getAllYears() {
        return this.trendService.getYears();
    }

}
