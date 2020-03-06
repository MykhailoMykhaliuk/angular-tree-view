import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boundaries',
  templateUrl: './boundaries.component.html',
  styleUrls: ['./boundaries.component.scss']
})
export class BoundariesComponent {
  @Input() min: number;
  @Input() max: number;
}
