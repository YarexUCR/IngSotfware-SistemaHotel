import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })

  export class CloudinaryService {
    private cloudName = 'davzj1f4v';
    private unsignedUploadPreset = 'unsigned_upload_preset';
    private url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;



    
  }
