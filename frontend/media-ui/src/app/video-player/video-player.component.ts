import { Component, Input } from '@angular/core';
 


@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {

  @Input()
  videoUrl!:string | '';

}
