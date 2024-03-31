import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, Validators} from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-facilidades',
    standalone: true,
    templateUrl: './facilidades.component.html',
    styleUrl: './facilidades.component.scss',
    imports: [FooterComponent]
})
export class FacilidadesComponent {

}
