import { Component } from '@angular/core';
import { intervention } from '../models/intervention.model';
import { InterventionsService } from '../Services/interventions.service';

@Component({
  selector: 'app-gerer-chaudiere',
  templateUrl: './gerer-inter.component.html',
  styleUrl: './gerer-inter.component.scss'
})
export class GererInterComponent {
  listeInter!: intervention[];

  constructor(private myInterService : InterventionsService) { }

  ngOnInit(): void {
    this.myInterService.getInterventions().subscribe((interventions)=>{this.listeInter =interventions;});
  }
}
