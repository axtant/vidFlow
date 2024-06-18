import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropDirective } from './directives/drag-drop.directive'; // Adjust the path as necessary

@NgModule({
  declarations: [DragDropDirective],
  imports: [CommonModule],
  exports: [DragDropDirective]
})
export class SharedModule { }
