package com.programming.ace.media_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    private String id;
    private String title;
    private String authorId;
    private Integer likeCount;
    private Integer dislikeCount;


}
