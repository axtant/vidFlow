import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { VideoService } from '../../video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [VideoService]
})
export class FileUploadComponent {
  files: File[] = [];
  fileUpload: boolean = false;

  constructor(private videoService: VideoService, private router:Router) { }

  onFileDropped(files: FileList) {
    this.addFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  addFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    this.fileUpload = true;
  }

  uploadVideo() {
    if (this.files.length > 0) {
      const formData: FormData = new FormData();
      // Append files using the key expected by the backend
      this.files.forEach(file => formData.append('file', file, file.name));

      // Send the FormData object with the file data
      this.videoService.uploadVideo(formData).subscribe(
        response => {
          this.router.navigateByUrl("/save-video-details/"+ response.videoId);
        },
        error => {
          console.error('Upload failed', error);
        }
      );
    }
  }
}
