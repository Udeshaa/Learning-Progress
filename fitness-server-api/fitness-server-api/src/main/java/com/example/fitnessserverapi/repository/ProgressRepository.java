package com.example.fitnessserverapi.repository;

import org.springframework.stereotype.Repository;

import com.example.fitnessserverapi.model.Progress;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
// This interface represents a repository for  entities. It extends MongoRepository, which provides basic CRUD operations for MongoDB.
public interface ProgressRepository extends MongoRepository<Progress, String> {
    // No additional methods are defined here because MongoRepository already provides methods for basic CRUD operations.
}
