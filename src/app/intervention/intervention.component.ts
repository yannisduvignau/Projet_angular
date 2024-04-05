import { Component, Input, OnInit, input } from '@angular/core';
import { intervention } from '../models/intervention.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionsService } from '../Services/interventions.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.scss'
})
export class InterventionComponent implements OnInit{
  @Input() Intervention!: intervention;
  theInter!: intervention;
  idInter!: number;

  constructor(private interService : InterventionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idInter = this.route.snapshot.params["id"];
    if (this.idInter !== undefined) {
      this.interService.getInterById(+this.idInter).subscribe(intervention => {this.theInter = intervention});
    } else {
      this.theInter = this.Intervention;
    }
  }

  deleteIntervention(id:number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette intervention ?")) {
      this.interService.deleteIntervention(id).subscribe({
        next: () => {
          this.router.navigateByUrl('gererIntervention');
        },
        error: err => {
          console.error('Une erreur est survenue lors de la suppression de l\'intervention:', err);
        }
      });
    }
  }

}
