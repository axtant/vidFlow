import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [VideoPlayerComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
  
  videoId!: string;
  videoUrl!:string;
  videoTitle!:string;
  videoDescription!:string;
  tags:Array<string>=[];
  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService){
    this.videoId = activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data=>{
      this.videoUrl=data.videoUrl;
      this.videoTitle= data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
    })
  }

}
