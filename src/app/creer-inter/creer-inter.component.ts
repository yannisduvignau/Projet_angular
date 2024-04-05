import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterventionsService } from '../Services/interventions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { chaudiere } from '../models/chaudiere.model';
import { intervention } from '../models/intervention.model';

@Component({
  selector: 'app-creer-inter',
  templateUrl: './creer-inter.component.html',
  styleUrl: './creer-inter.component.scss'
})
export class CreerInterComponent implements OnInit{
  formulaire: FormGroup;
  currentInter!:intervention;

  chaudiereList!: chaudiere[];
  selectedChaudiere!: chaudiere;

  constructor(private formBuilder: FormBuilder, private interService: InterventionsService, private router: Router) {
    this.formulaire = this.formBuilder.group({
      dateInter: [null, Validators.required],
      descriptionInter: [null, Validators.required],
      duree: [null, Validators.required],
      numChaudiere: [null, Validators.required]
    });

    this.formulaire.valueChanges.subscribe((formValue) => {
      this.currentInter ={
        id:0,
        dateInter: formValue.dateInter,
        descriptionInter: formValue.descriptionInter,
        duree: formValue.duree,
        numChaudiere: formValue.numChaudiere
      }

      //
      this.interService.getChaudiereById(this.formulaire.get('numChaudiere')?.value).subscribe((chaudiere)=>{this.selectedChaudiere = chaudiere});
  
    });

    
  }

  ngOnInit(): void {
    // Récupérer la liste des chaudières
    this.interService.getChaudiereList().subscribe((chaudieres)=>{this.chaudiereList =chaudieres;});

    }

  // Fonction pour soumettre le formulaire et créer une nouvelle intervention
  creerIntervention() {
    let newInter: intervention ={
      id:0,
      dateInter: this.formulaire.get('dateInter')?.value,
      descriptionInter: this.formulaire.get('descriptionInter')?.value,
      duree: this.formulaire.get('duree')?.value,
      numChaudiere: this.formulaire.get('numChaudiere')?.value
    }

    this.interService.createIntervention(newInter).subscribe({
      next : intervention =>
      {
        this.router.navigateByUrl('gererInter');
      },
      error : err =>
      {
        console.log('Observable ajout intervention a émis une erreur :'+err);
        alert("Désolé l'intervention n'a pu être ajouté")
      }
    });
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
