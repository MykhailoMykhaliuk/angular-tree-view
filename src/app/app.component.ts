import { Component } from '@angular/core';
import { DataFlowService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(protected dataFlowService: DataFlowService) { }
}
