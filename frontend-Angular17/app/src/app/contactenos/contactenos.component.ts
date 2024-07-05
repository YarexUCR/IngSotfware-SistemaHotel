import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
    selector: 'app-contactenos',
    standalone: true,
    templateUrl: './contactenos.component.html',
    styleUrls: ['./contactenos.component.scss'],
    imports: [FooterComponent, FormsModule] // Include FormsModule in the imports array
})
export class ContactenosComponent {
    token: string | null; // token de session
    contactForm = {
      name: '',
      email: '',
      message: ''
    };

    constructor(private router: Router, private http: HttpClient) {
      // para resguardar ruta
      if (typeof localStorage !== 'undefined') {
        this.token = localStorage.getItem('token');
      } else {
        this.token = null;
      }
    }

    ngOnInit() {
      // verificar autenticacion
      if (this.token != null) {
        this.router.navigate(['/admin/home']);
      }
    }

    onSubmit() {
      
      this.http.post('https://localhost:7200/api/Email/send-email', this.contactForm)
        .subscribe(response => {
          console.log('Email sent successfully', response);
        }, error => {
          console.error('Error sending email', error);
        });
    }
}
