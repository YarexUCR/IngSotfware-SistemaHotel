import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-como-llegar',
    standalone: true,
    templateUrl: './como-llegar.component.html',
    styleUrl: './como-llegar.component.scss',
    imports: [
      FooterComponent,
      MatGridListModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule
    ]
})
export class ComoLlegarComponent {

}
