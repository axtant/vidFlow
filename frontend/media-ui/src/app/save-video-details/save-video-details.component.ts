import { Component, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VideoService } from '../video.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { VideoDto } from '../video-dto';



@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    VideoPlayerComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule 
  ],
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
  providers: [VideoService] // Ensure VideoService is provided here
})
export class SaveVideoDetailsComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  announcer = inject(LiveAnnouncer);

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  fileSelected = false;
  selectedFileName: string = '';
  selectedFile: File | null = null;
  videoId: string;
  snackBar = inject(MatSnackBar); 
  videoUrl!:string;
  thumbnailUrl!:string;

  constructor(private videoService: VideoService) {
    const activatedRoute = inject(ActivatedRoute);
    this.videoId = activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data=>{
      this.videoUrl=data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.fileSelected = true;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadThumbnail(this.selectedFile, this.videoId);
    }
  }

  uploadThumbnail(file: File, videoId: string): void {
    const formData = this.createFormData(file, videoId);
    this.videoService.uploadThumbnail(formData, videoId)
      .subscribe(
        response => {
          console.log('Thumbnail uploaded successfully', response);
          this.snackBar.open('Thumbnail uploaded successfully!', 'Close', {
            duration: 3000
          });
          // Handle successful upload response
        },
        error => {
          console.error('Error uploading thumbnail', error);
          this.snackBar.open('Error uploading thumbnail', 'Close', {
            duration: 3000
          });
          // Handle upload error
        }
      );
    // Reset file selection
    this.fileSelected = false;
    this.selectedFileName = '';
    this.selectedFile = null;
  }

  private createFormData(file: File, videoId: string): FormData {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('videoId', videoId);
    return formData;
  }

  saveVideo(){
    // make calls to videoserviece
    const videoMetaData: VideoDto={
      "id":this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description":this.saveVideoDetailsForm.get('description')?.value,
      "tags":this.tags,
      "videoStatus":this.saveVideoDetailsForm.get('videoStatus')?.value,
      "videoUrl":this.videoUrl,
      "thumbnailUrl":this.thumbnailUrl
    }
    this.videoService.saveVideo(videoMetaData).subscribe(data =>{
      this.snackBar.open("MetaData Updated Successfully!", 'Close')
    })
  }
}
