import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Material
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// cepgp
import { CepgpService } from './../services/cepgp.service'
import { CEPGPTraffic } from './../models/cepgp-traffic'

// const ELEMENT_DATA:	  PlayerEPGP[]= [
//   {name: 'Healthpack', class: 'Priest', rank: "Raider", ep: 866, gp: 10, prio: 86.6},
//   {name: 'Niico', class: 'Druid', rank: "Raider", ep: 853, gp: 10, prio: 85.3},
//   {name: 'Hizen', class: 'Priest', rank: "Officer", ep: 839, gp: 10, prio: 83.9},
//   {name: 'Chawdron', class: 'Rogue', rank: "Raider", ep: 829, gp: 10, prio: 82.9},
// ];


@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})

export class PlayerListComponent implements OnInit {

	displayedColumns: string[] = ['rank', 'player', 'epa', 'gpa', 'prio'];
  currentCepgp: CEPGPTraffic[];
  dataSource : any;

	@ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private router: Router, private cepgpService: CepgpService) { }

  ngOnInit() {
    this.getCurrengCepgp();
  }

  getCurrengCepgp(): void {
    this.dataSource = new MatTableDataSource<CEPGPTraffic>();
    this.cepgpService.getCurrentCepgp()
      .subscribe(currentCepgp => {
                    this.dataSource = new MatTableDataSource<CEPGPTraffic>(currentCepgp);
                    this.dataSource.sort = this.sort;
                  },
                  err => {console.log(err)});
  }
}

