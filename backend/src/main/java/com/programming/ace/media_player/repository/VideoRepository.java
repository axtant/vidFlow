package com.programming.ace.media_player.repository;

import com.programming.ace.media_player.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
}
