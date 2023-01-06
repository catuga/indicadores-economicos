import { Indicador, IndicadorByDate } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private indicadoresUrl = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) { }

  getIndicadores(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(this.indicadoresUrl)
  }

  getIndicadorWithDate(indicador: string, date: string): Observable<IndicadorByDate> {
    return this.http.get<IndicadorByDate>(`${this.indicadoresUrl}/${indicador}/${date}`)
  }
}
