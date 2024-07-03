import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class VideoCardComponent {
  @Input() video: any;

  constructor(private router: Router) {}

  navigateToVideoDetails(videoId: string) {
    this.router.navigate(['/video-details', videoId]);
  }
}
