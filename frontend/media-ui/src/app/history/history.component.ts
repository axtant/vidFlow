import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent,MatSidenavModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

}
