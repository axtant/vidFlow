package com.programming.ace.media_player.service;

import org.springframework.web.multipart.MultipartFile;
public interface FileService {
    String uploadFile(MultipartFile file);
}
