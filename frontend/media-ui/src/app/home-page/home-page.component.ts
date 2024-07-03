import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { VideoCardComponent } from '../video-card/video-card.component';
import { CommonModule } from '@angular/common';
import { VideoService } from '../video.service';
import { response } from 'express';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SidebarComponent, MatSidenavModule,VideoCardComponent,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] 
})
export class HomePageComponent implements OnInit{
  
  featuredVideos : Array<VideoDto>=[];
  constructor(private videoService:VideoService){

  }
  ngOnInit(): void {
      this.videoService.getAllVideos().subscribe(response=>{
        this.featuredVideos = response;
      })
  }

}
