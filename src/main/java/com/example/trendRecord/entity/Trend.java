package com.example.trendRecord.entity;

import org.springframework.stereotype.Component;

import javax.persistence.Id;

@Component
public class Trend {
    @Id
    Integer id;

    Integer position;
    Integer time;
    String title;
    Integer views;

    public Trend(Integer position, String title, Integer views) {
        this.position = position;
        this.title = title;
        this.views = views;
    }

    public Trend(Integer id, Integer position, Integer time, String title, Integer views) {
        this(position, time, title, views);
        this.id = id;
    }

    public Trend(Integer id, Integer position, String timeStr, String title, Integer views) {
        this(position, timeStr, title, views);
        this.id = id;
    }

    public Trend(Integer position, Integer time, String title, Integer views) {
        this.position = position;
        this.time = time;
        this.title = title;
        this.views = views;
    }

    public Trend(Integer position, String timeStr, String title, Integer views) {
        this.position = position;
        setTime(timeStr);
        this.title = title;
        this.views = views;
    }

    public Trend() {
    }

    public Trend(Integer id, Integer position, Integer time, Integer views) {
        this.id = id;
        this.position = position;
        this.time = time;
        this.views = views;
        this.title = null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public void setTime(String timeStr) {
        this.time = TimeLabel.isNumeric(timeStr) ? Integer.valueOf(timeStr) : null;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    @Override
    public String toString() {
        return "Trend{" +
                "position=" + position +
                ", time=" + time +
                ", title='" + title + '\'' +
                ", views=" + views +
                '}';
    }
}

/*
CREATE TABLE `demo`.`20080726` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `position` INT UNSIGNED NULL,
  `title` VARCHAR(63) NOT NULL,
  `views` INT UNSIGNED NULL,
  `time` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
 */

/*
CREATE TABLE `demo`.`recorddates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `year` INT UNSIGNED NULL,
  `date` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

 */

/*
Time,No.,Content,Hotness
2021-11-10 23:40:51,,,
,,十九届六中全会精神,
,1,双11狂欢夜,1959911
,2,英国宣布承认中国疫苗,1075482
,3,购物车,719792
,•,京东今晚8点提前开抢,
,4,时代少年团哪吒首秀,710316
,5,吉林市一确诊病例曾到京出差,614700
 */