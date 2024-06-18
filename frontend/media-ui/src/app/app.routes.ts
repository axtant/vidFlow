import { Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';

export const routes: Routes = [
{ path: 'upload-video', component: FileUploadComponent },
{ path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent },
// Add other routes here
];
