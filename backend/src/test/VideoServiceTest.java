package com.programming.ace.media_player.service;

import com.programming.ace.media_player.dto.UploadVideoResponse;
import com.programming.ace.media_player.dto.VideoDto;
import com.programming.ace.media_player.model.Video;
import com.programming.ace.media_player.repository.VideoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class VideoServiceTest {

    @Mock
    private S3Service s3Service;

    @Mock
    private VideoRepository videoRepository;

    @InjectMocks
    private VideoService videoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void uploadVideo() {
        MultipartFile multipartFile = mock(MultipartFile.class);
        String videoUrl = "http://s3.amazon.com/video.mp4";

        when(s3Service.uploadFile(multipartFile)).thenReturn(videoUrl);
        when(videoRepository.save(any(Video.class))).thenAnswer(invocation -> {
            Video video = invocation.getArgument(0);
            video.setId("123");
            return video;
        });

        UploadVideoResponse response = videoService.uploadVideo(multipartFile);

        assertEquals("123", response.getVideoId());
        assertEquals(videoUrl, response.getVideoUrl());
        verify(videoRepository, times(1)).save(any(Video.class));
    }

    @Test
    void editVideo() {
        VideoDto videoDto = new VideoDto("123", "title", "description", Set.of("tag1"), "http://video.com", null, "http://thumbnail.com", 0);
        Video video = new Video();
        video.setId("123");

        when(videoRepository.findById("123")).thenReturn(Optional.of(video));
        when(videoRepository.save(any(Video.class))).thenReturn(video);

        VideoDto updatedVideoDto = videoService.editVideo(videoDto);

        assertEquals(videoDto.getTitle(), updatedVideoDto.getTitle());
        assertEquals(videoDto.getDescription(), updatedVideoDto.getDescription());
        verify(videoRepository, times(1)).save(any(Video.class));
    }

    @Test
    void uploadThumbnail() {
        MultipartFile multipartFile = mock(MultipartFile.class);
        String thumbnailUrl = "http://s3.amazon.com/thumbnail.png";
        Video video = new Video();
        video.setId("123");

        when(videoRepository.findById("123")).thenReturn(Optional.of(video));
        when(s3Service.uploadFile(multipartFile)).thenReturn(thumbnailUrl);
        when(videoRepository.save(any(Video.class))).thenReturn(video);

        String returnedThumbnailUrl = videoService.uploadThumbnail(multipartFile, "123");

        assertEquals(thumbnailUrl, returnedThumbnailUrl);
        verify(videoRepository, times(1)).save(any(Video.class));
    }

    @Test
    void getVideoDetails() {
        Video video = new Video("123", "title", "description", null, null, Set.of("tag1"), "http://video.com", "http://thumbnail.com", null, 0, null);

        when(videoRepository.findById("123")).thenReturn(Optional.of(video));

        VideoDto videoDto = videoService.getVideoDetails("123");

        assertEquals(video.getId(), videoDto.getId());
        assertEquals(video.getTitle(), videoDto.getTitle());
        assertEquals(video.getDescription(), videoDto.getDescription());
        verify(videoRepository, times(1)).findById("123");
    }

    @Test
    void getAllVideos() {
        Video video1 = new Video("123", "title1", "description1", null, null, Set.of("tag1"), "http://video1.com", "http://thumbnail1.com", null, 0, null);
        Video video2 = new Video("456", "title2", "description2", null, null, Set.of("tag2"), "http://video2.com", "http://thumbnail2.com", null, 0, null);

        when(videoRepository.findAll()).thenReturn(List.of(video1, video2));

        List<VideoDto> videoDtos = videoService.getAllVideos();

        assertEquals(2, videoDtos.size());
        verify(videoRepository, times(1)).findAll();
    }

    @Test
    void getVideoById_notFound() {
        when(videoRepository.findById("123")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> videoService.getVideoById("123"));
    }
}
