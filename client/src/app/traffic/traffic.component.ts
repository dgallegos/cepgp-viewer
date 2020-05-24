import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatFormFieldControl} from '@angular/material/form-field';

// cepgp
import { CepgpService } from './../services/cepgp.service'
import { CEPGPTraffic } from './../models/cepgp-traffic'


// const ELEMENT_DATA: CEPGPTraffic[] = [
//   {player: "Locklian", issuer: 'Itches', action: "add", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"weapon1", timeStamp:0, prio: 1},
//   {player: "Fraxx", issuer: 'Itches', action: "sub", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"staff", timeStamp:0, prio: 1},
//   {player: "Blessie", issuer: 'Itches', action: "add", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"axe", timeStamp:0, prio: 1},
//   {player: "Byce", issuer: 'Itches', action: "add", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"offhand",timeStamp:0, prio: 1},
//   {player: "Locklian", issuer: 'Itches', action: "sub", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"weapon2", timeStamp:0, prio: 1},
//   {player: "Fraxx", issuer: 'Itches', action: "sub", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"shield", timeStamp:0, prio: 1},
//   {player: "Blessie", issuer: 'Itches', action: "sub", epb: 7, epa:14, gpb:45, gpa:12, itemLink:"trinket", timeStamp:0, prio: 1},
// ];

@Component({
  selector: 'traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css']
})
export class TrafficComponent implements OnInit {
  displayedColumns: string[] = ['player', 'issuer', 'action', 'epb', 'epa', 'gpb', 'gpa'];
  dataSource : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router, private cepgpService: CepgpService) { }

  ngOnInit() {
   this.getTraffic();
  }

  getTraffic(): void {
    this.dataSource = new MatTableDataSource<CEPGPTraffic>();
    this.cepgpService.getTraffic()
      .subscribe(cepgpTraffic => {
                    this.dataSource = new MatTableDataSource<CEPGPTraffic>(cepgpTraffic.reverse());
                  },
                  err => {console.log(err)});
  }
}
