import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadVideoResponse } from './components/file-upload/UploadVideoResponse'; // Ensure the correct path
import { VideoDto } from '../app/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) { }

  uploadVideo(formData: FormData): Observable<UploadVideoResponse> {
    return this.http.post<UploadVideoResponse>(this.baseUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadThumbnail(formData: FormData, videoId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/thumbnail`, formData, { responseType: 'text' })
    .pipe(
      catchError(this.handleError)
    );
  }

  getVideo(videoId: string): Observable<VideoDto> {
    return this.http.get<VideoDto>(`${this.baseUrl}/${videoId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Upload failed', error);
    return throwError('An error occurred while uploading the video');
  }

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto>{
    return this.http.put<VideoDto>(this.baseUrl, videoMetaData); 
  }

  getAllVideos(): Observable<Array<VideoDto>>{
    return this.http.get<Array<VideoDto>>(this.baseUrl);
  }

}
