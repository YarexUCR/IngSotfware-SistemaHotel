import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-contactenos',
    standalone: true,
    templateUrl: './contactenos.component.html',
    styleUrl: './contactenos.component.scss',
    imports: [FooterComponent]
})
export class ContactenosComponent {

}
