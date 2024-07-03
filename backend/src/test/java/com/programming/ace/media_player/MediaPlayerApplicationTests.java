package com.programming.ace.media_player;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import com.programming.ace.media_player.dto.UploadVideoResponse;
import com.programming.ace.media_player.dto.VideoDto;
import com.programming.ace.media_player.model.Video;
import com.programming.ace.media_player.repository.VideoRepository;
import com.programming.ace.media_player.service.S3Service;
import com.programming.ace.media_player.service.VideoService;


@SpringBootTest
class MediaPlayerApplicationTests {

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

	

}
