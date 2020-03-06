import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expand-icon',
  templateUrl: './expand-icon.component.html',
  styleUrls: ['./expand-icon.component.scss']
})
export class ExpandIconComponent {
  @Input() expanded: boolean = false;
}
