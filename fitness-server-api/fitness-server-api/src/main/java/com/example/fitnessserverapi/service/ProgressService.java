package com.example.fitnessserverapi.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;


public class ProgressService {
        
        @Id
        private String id;
    
        private String progressState;
        private String description;
        private Date date;
        private List<WorkoutStateDetail> state;
    
        // Constructor
        public ProgressService() {
            this.state = new ArrayList<>();
        }

        public ProgressService(String progressState, Date date, String description) {
            this.progressState = progressState;
            this.date=date;
            this.description=description;
            this.state = new ArrayList<>();
        }
    
    
        // Getters and setters
        public String getId() {
            return id;
        }
    
        public void setId(String id) {
            this.id = id;
        }
    
        public String getWorkoutState() {
            return progressState;
        }
    
        public void setWorkoutState(String workoutState) {
            this.progressState = progressState;
        }
    
        public String getDescription() {
            return description;
        }
    
        public void setDescription(String description) {
            this.description = description;
        }
    
        public Date getDate() {
            return date;
        }
    
        public void setDate(Date date) {
            this.date = date;
        }
    
        //getter for arraylist    
        public List<WorkoutStateDetail> getState() {
            return state;
        }
        
        //setter for arraylist
        public void setState(List<WorkoutStateDetail> state) {
            this.state = state;
        }
    
        // Inner class for  state detail
        public static record WorkoutStateDetail(String name) {}
    }
    