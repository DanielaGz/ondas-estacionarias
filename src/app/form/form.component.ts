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
  num_armonicos = new FormControl('', [Validators.required]);
  masa = new FormControl('', [Validators.required]);

  @Output() formDataEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
  }

  saveForm(form:NgForm){
    if(
      this.material.hasError("required") || this.longitud_cuerda.hasError("required") || this.longitud_cuerda_unidades.hasError("required") || this.amplitud_onda.hasError("required") || this.amplitud_onda_unidades.hasError("required") || this.num_armonicos.hasError("required")
    ){}else{
      this.formDataEvent.emit({
        material: this.material.value,
        longitud_cuerda: this.unitConvert(this.longitud_cuerda.value,this.longitud_cuerda_unidades.value),
        longitud_cuerda_unidades: this.longitud_cuerda_unidades.value,
        amplitud_onda: this.unitConvert(this.amplitud_onda.value, this.amplitud_onda_unidades.value)/2,
        amplitud_onda_unidades: this.amplitud_onda_unidades.value,
        num_armonicos: Number(this.num_armonicos.value),
        masa: Number(this.masa.value)
      });
    }
  }

  unitConvert(val, unit){
    let value_number = Number(val)
    switch(unit){
      case 'cm':{
        return value_number/100
      }
      default: return value_number;
    }
  }

}
