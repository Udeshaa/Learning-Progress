package com.example.fitnessserverapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.fitnessserverapi.model.Progress;
import com.example.fitnessserverapi.repository.ProgressRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
@RequestMapping("/api")
public class ProgressController { 

    //
    private final ProgressRepository progressRepository;

    @Autowired
    public ProgressController(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    // Endpoint to retrieve all
    @GetMapping("/Progress")
    public ResponseEntity<List<Progress>> getAllWorkout() {
        return ResponseEntity.ok(this.progressRepository.findAll());
    }

    // Endpoint to create a new
    @PostMapping("/CreateProgress")
    public ResponseEntity<Progress> createWorkout(@RequestBody Progress workout) {
        // Save the new workout and return it with status 201 Created
        return ResponseEntity.status(201).body(this.progressRepository.save(workout));
    }

    // Endpoint to retrieve
    @GetMapping("/Progress/{id}")
    public ResponseEntity getWorkoutByID(@PathVariable String id) {
        Optional<Progress> optionalProgress = this.progressRepository.findById(id);

        if (optionalProgress.isPresent()) {
            // If the   found, return it
            return ResponseEntity.ok(optionalProgress.get());
        } else {
            // If the   not found, return a message
            return ResponseEntity.ok("The workout with ID " + id + " was not found");
        }
    }


    // Endpoint to delete
    @DeleteMapping("/ProgressDelete/{id}")
    public ResponseEntity deleteWorkoutByID(@PathVariable String id) {
        Optional<Progress> optionalProgress = this.progressRepository.findById(id);

        if (optionalProgress.isPresent()) {
            // If the   found, delete it and return a success message
            this.progressRepository.deleteById(id);
            return ResponseEntity.ok().body("{\"message\": \"Progress with ID " + id + " deleted successfully\"}");
        } else {
            // If the   not found, return a message
            return ResponseEntity.ok().body("{\"message\": \"The Progress with ID " + id + " was not found\"}");
        }
    }


    // Endpoint to update a
    @PutMapping("/ProgressUp/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable String id, @RequestBody Progress updatedp) {
        Optional<Progress> optionalp = this.progressRepository.findById(id);
        if (optionalp.isPresent()) {
            // If the  found, update its values and return the updated
            Progress workout = optionalp.get();
            workout.setProgressState(updatedp.getProgressState());
            workout.setDescription(updatedp.getDescription());
            workout.setDate(updatedp.getDate());
            workout.setState(updatedp.getState());
            return ResponseEntity.ok(this.progressRepository.save(workout));
        } else {
            // If the  is not found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }
}
