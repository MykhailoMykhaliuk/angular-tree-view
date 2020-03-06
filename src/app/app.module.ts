import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import {
  TreeComponent,
  ContextMenuComponent,
  ExpandIconComponent,
  BoundariesComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ContextMenuComponent,
    ExpandIconComponent,
    BoundariesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule
  ],
  providers: [],
  entryComponents: [ContextMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
