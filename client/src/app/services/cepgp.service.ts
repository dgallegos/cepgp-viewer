import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CEPGPTraffic } from './../models/cepgp-traffic'

@Injectable({
  providedIn: 'root',
})


export class CepgpService {

  constructor(private http:HttpClient) { }

  getCurrentCepgp() {
  	return this.http.get<CEPGPTraffic[]>('/api/cepgp/current');
  }

  getTraffic() {
  	return this.http.get<CEPGPTraffic[]>('/api/cepgp/traffic');
  }
}