package com.programming.ace.media_player.service;


import com.programming.ace.media_player.dto.UploadVideoResponse;
import com.programming.ace.media_player.dto.VideoDto;
import com.programming.ace.media_player.model.Video;
import com.programming.ace.media_player.repository.VideoRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile){
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);

        // mongodb save
        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(),savedVideo.getVideoUrl());
    }

    public VideoDto editVideo(VideoDto videoDto) {
        //find the video from  video id
        var savedVideo = getVideoById(videoDto.getId());
        //map the videoDto fields video
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());
        //save the video to the database

        videoRepository.save(savedVideo);
        return videoDto;

    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        var savedVideo = getVideoById(videoId);

        String thumbnailUrl = s3Service.uploadFile(file);

        //setting thumbnailUrl
        savedVideo.setThumbnailUrl(thumbnailUrl);

        videoRepository.save(savedVideo);
        return thumbnailUrl;

    }
    Video getVideoById(String videoId){
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find video Id - "+ videoId));
    }
    
    public VideoDto getVideoDetails(String videoId){
        Video saveVideo = getVideoById(videoId);
        
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoUrl(saveVideo.getVideoUrl());
        videoDto.setThumbnailUrl(saveVideo.getThumbnailUrl());
        videoDto.setDescription(saveVideo.getDescription());
        videoDto.setId(saveVideo.getId());
        videoDto.setTitle(saveVideo.getTitle());
        videoDto.setTags(saveVideo.getTags());
        videoDto.setVideoStatus(saveVideo.getVideoStatus());

        return videoDto;
    }

    public List<VideoDto> getAllVideos() {
        return videoRepository.findAll().stream()
                .map(this::mapToVideoDto)
                .collect(Collectors.toList());
    }
    
    private VideoDto mapToVideoDto(Video video) {
        VideoDto videoDto = new VideoDto();
        videoDto.setId(video.getId());
        videoDto.setTitle(video.getTitle());
        videoDto.setDescription(video.getDescription());
        videoDto.setTags(video.getTags());
        videoDto.setThumbnailUrl(video.getThumbnailUrl());
        videoDto.setVideoUrl(video.getVideoUrl());
        videoDto.setVideoStatus(video.getVideoStatus());
        return videoDto;
    }
}

