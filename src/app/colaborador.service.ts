import { Colaborador } from './colaborador';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class ColaboradorService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.apiServerUrl}cafe/colab/`);
  }

  public addColaborador(colab: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${this.apiServerUrl}cafe/colab/`, colab);
  }

  public updateColaborador(colab: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.apiServerUrl}cafe/colab/`, colab);
  }

  public deleteColaborador(colabId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}cafe/colab/${colabId}`);
  }
}
