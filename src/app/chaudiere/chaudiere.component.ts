import { Component, Input, OnInit } from '@angular/core';
import { chaudiere } from '../models/chaudiere.model';
import { ChaudieresService } from '../Services/chaudieres.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chaudiere',
  templateUrl: './chaudiere.component.html',
  styleUrl: './chaudiere.component.scss'
})
export class ChaudiereComponent implements OnInit{
  @Input() Chaudiere!: chaudiere;
  theChaudiere!: chaudiere;
  idchaudiere!: number;

  constructor(private chaudiereService : ChaudieresService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idchaudiere = this.route.snapshot.params["id"];
    if (this.idchaudiere !== undefined) {
      this.chaudiereService.getChaudById(+this.idchaudiere).subscribe(chaudiere => {this.theChaudiere = chaudiere});
    } else {
      this.theChaudiere = this.Chaudiere;
    }
  }
}
