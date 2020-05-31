import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


// cepgp

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  fileToUpload: File = null;
  resData: any;
  hide = true;
  uploadPass: string;
  guildRoster: string
  uploadResponse: string;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }
  
  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0); 
  }

  uploadClick () {
    const endpoint = '/api/cepgp';
    let formData: FormData = new FormData();
    formData.append('cepgplua', this.fileToUpload);
    formData.append('guildRoster', this.guildRoster);
    formData.append('uploadPass', this.uploadPass);
    return this.http
      .post(endpoint, formData)
      .subscribe((data: any) => {
        this.resData = data;
        this.uploadResponse = "Uploaded Successfully!";
      }, err => {
        this.uploadResponse = err.error;
      });
  }
}
