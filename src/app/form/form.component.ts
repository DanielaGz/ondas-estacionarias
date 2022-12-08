import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  material = new FormControl('', [Validators.required]);
  longitud_cuerda = new FormControl('', [Validators.required]);
  longitud_cuerda_unidades = new FormControl('m', [Validators.required]);
  amplitud_onda = new FormControl('', [Validators.required]);
  amplitud_onda_unidades = new FormControl('m', [Validators.required]);
  longitud_onda = new FormControl('', [Validators.required]);
  longitud_onda_unidades = new FormControl(0, [Validators.required]);
  num_armonicos = new FormControl('', [Validators.required]);

  @Output() formDataEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
  }

  saveForm(form:NgForm){
    if(
      this.material.hasError("required") || this.longitud_cuerda.hasError("required") || this.longitud_cuerda_unidades.hasError("required") || this.amplitud_onda.hasError("required") || this.amplitud_onda_unidades.hasError("required") || this.longitud_onda.hasError("required") || this.longitud_onda_unidades.hasError("required") || this.num_armonicos.hasError("required")
    ){}else{
      this.formDataEvent.emit({
        material: this.material.value,
        longitud_cierda: this.longitud_cuerda.value,
        longitud_cuerda_unidades: this.longitud_cuerda_unidades.value,
        amplitud_onda: this.amplitud_onda.value,
        amplitud_onda_unidades: this.amplitud_onda_unidades.value,
        longitud_onda: this.longitud_onda.value,
        longitud_onda_unidades: this.longitud_onda_unidades.value,
        num_armonicos: this.num_armonicos.value
      });
    }
  }

  unitConver(){

  }

}
