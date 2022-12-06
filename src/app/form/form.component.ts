import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  material: string;
  longitud_cuerda: number;
  longitud_cuerda_unidades: string;
  amplitud_onda: number;
  amplitud_onda_unidades: string;
  longitud_onda: number;
  amplitud_longitud_onda: number;
  num_armonicos: number;

  constructor(private _ondasService : OndasEstacionariasService) {
    this.material = "";
    this.longitud_cuerda = 0;
    this.longitud_cuerda_unidades  = "m";
    this.amplitud_onda = 0;
    this.amplitud_onda_unidades = "m";
    this.amplitud_longitud_onda = 0;
    this.longitud_onda = 0;
    this.num_armonicos = 0;
  }

  ngOnInit(): void {
  }

  saveForm(form:NgForm){
    alert('ci')
  }

  unitConver(){

  }

}
