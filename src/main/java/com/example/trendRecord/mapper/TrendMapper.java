package com.example.trendRecord.mapper;

import com.example.trendRecord.entity.Trend;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TrendMapper {

    List<String> getDbNames();

    List<Integer> getYears();

    List<Integer> getDatesOnYear(@Param("year") String year);

    List<Integer> getTimesFromDb(@Param("dbname") String dbname);

    List<Integer> getTimesOnDate(@Param("year") String year, @Param("date") String date);

    List<Trend> getTrendsOnTime(@Param("year") String year, @Param("date") String date, @Param("time") String time);

    List<Trend> getPositionsOfTrend(@Param("year") String year, @Param("date") String date, @Param("trendName") String trendName);
}


/*
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2011', '0604');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2011', '0708');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2011', '1001');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2011', '1204');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2012', '0104');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2012', '0218');
INSERT INTO `demo`.`recorddates` (`year`, `date`) VALUES ('2012', '0817');
 */