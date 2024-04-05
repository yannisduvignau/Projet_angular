import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { intervention } from '../models/intervention.model';
import { InterventionsService } from '../Services/interventions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { chaudiere } from '../models/chaudiere.model';

@Component({
  selector: 'app-modifier-inter',
  templateUrl: './modifier-inter.component.html',
  styleUrls: ['./modifier-inter.component.scss'] // Utilisation de `styleUrls` au lieu de `styleUrl`
})
export class ModifierInterComponent implements OnInit {
  formulaire!: FormGroup;
  currentInter!: intervention;

  @Input() Intervention!: intervention;
  idInter!: number;

  chaudiereList!: chaudiere[];
  selectedChaudiere!: chaudiere;

  constructor(private formBuilder: FormBuilder, private interService: InterventionsService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit(): void {
    this.formulaire = this.formBuilder.group({
      dateInter: [null, [Validators.required]], // Retirer Validators.min(0), la date ne peut pas être négative
      descriptionInter: [null, [Validators.required, Validators.minLength(1)]],
      duree: [null, [Validators.required]], // Retirer Validators.minLength(0), la durée ne peut pas être négative
      numChaudiere: [null, [Validators.required, Validators.min(0)]]
    });

    this.idInter = this.route.snapshot.params["id"];
    if (this.idInter !== undefined) {
      this.interService.getInterById(this.idInter).subscribe(intervention => {
        this.currentInter = intervention;
        // Pré-remplir le formulaire avec les valeurs récupérées
        this.formulaire.patchValue({
          dateInter: this.currentInter.dateInter,
          descriptionInter: this.currentInter.descriptionInter,
          duree: this.currentInter.duree,
          numChaudiere: this.currentInter.numChaudiere
        });
      });
    } else {
      this.currentInter = this.Intervention;
    }

    // Récupérer la liste des chaudières
    this.interService.getChaudiereList().subscribe((chaudieres)=>{this.chaudiereList =chaudieres;});

    this.formulaire.valueChanges.subscribe((formValue) => {
      this.currentInter ={
        id: this.idInter,
        dateInter: formValue.dateInter,
        descriptionInter: formValue.descriptionInter,
        duree: formValue.duree,
        numChaudiere: formValue.numChaudiere
      }

      //
      this.interService.getChaudiereById(this.formulaire.get('numChaudiere')?.value).subscribe((chaudiere)=>{this.selectedChaudiere = chaudiere});
    });
  }

  modifIntervention(): void {
    let modifInter: intervention = {
      id: this.idInter, // Utilisation de l'ID récupéré de l'URL
      dateInter: this.formulaire.get('dateInter')?.value,
      descriptionInter: this.formulaire.get('descriptionInter')?.value,
      duree: this.formulaire.get('duree')?.value,
      numChaudiere: this.formulaire.get('numChaudiere')?.value
    }

    this.interService.modifInter(modifInter).subscribe({
      next: intervention => {
        this.router.navigateByUrl('gererInter');
      },
      error: err => {
        console.log('Observable ajout intervention a émis une erreur :' + err);
        alert("Désolé l'intervention n'a pu être ajoutée"); // Correction du message d'alerte
      }
    })
  }

  isEmpty(formValue: any): boolean {
    for (let key in formValue) {
        if (formValue[key] !== null && formValue[key] !== '') {
            return false;
        }
    }
    return true;
  }
}
