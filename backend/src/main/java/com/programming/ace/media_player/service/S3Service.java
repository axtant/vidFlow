package com.programming.ace.media_player.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService {

    public static final String BUCKET_NAME = "mymicroservices";
    private final AmazonS3 amazonS3;  

    @Override
    public String uploadFile(MultipartFile file) {
        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename()); // Extracting file extention
        var key = UUID.randomUUID().toString() + "." + filenameExtension; // Generating a unique key

        var metadata = new ObjectMetadata(); // Setting metadata
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try {   // Uploading to the bucket
            amazonS3.putObject(BUCKET_NAME, key, file.getInputStream(), metadata); 
        } catch (IOException ioException) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An Exception occurred while uploading file");
        }
        amazonS3.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);
        return amazonS3.getUrl(BUCKET_NAME, key).toString();  // Returning the url
    }
}
