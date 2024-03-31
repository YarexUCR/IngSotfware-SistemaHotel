import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-tarifas',
    standalone: true,
    templateUrl: './tarifas.component.html',
    styleUrl: './tarifas.component.scss',
    imports: [FooterComponent]
})
export class TarifasComponent {

}
