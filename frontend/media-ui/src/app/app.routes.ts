import { Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HistoryComponent } from './history/history.component';
import { FeaturedComponent } from './featured/featured.component';

export const routes: Routes = [
{ path: '', component: HomePageComponent},
{ path: 'featured', component: FeaturedComponent},
{ path: 'history', component: HistoryComponent},
{ path: 'upload-video', component: FileUploadComponent },
{ path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent },
{ path: 'video-details/:videoId', component: VideoDetailComponent },
];
