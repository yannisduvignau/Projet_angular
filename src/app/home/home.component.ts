import { Component, OnInit } from '@angular/core';
import { chaudiere } from '../models/chaudiere.model';
import { ChaudieresService } from '../Services/chaudieres.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  listechaudiere! : chaudiere[];

  constructor(private chaudiereService : ChaudieresService) { }

  ngOnInit(): void {
    this.chaudiereService.getChaudieres().subscribe((chaudieres)=>{this.listechaudiere =chaudieres;});
  }
}
