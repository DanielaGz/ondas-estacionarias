import { Injectable } from '@angular/core';
import { OndasEstacionarias } from './ondas-estacionarias.model';

@Injectable({
  providedIn: 'root'
})
export class OndasEstacionariasService {

  public ondasModel = new OndasEstacionarias();

  constructor() { }
}
