// datos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private apiUrlSaveDatasets = 'http://localhost:3000/saveDatasets';
  private apiUrlExecuteQueries = 'http://localhost:3000/executeQueries';

  constructor(private http: HttpClient) {}

  obtenerDatosSaveDatasets(): Observable<any> {
    return this.http.post(this.apiUrlSaveDatasets, {});
  }

  /*
  ejecutarConsultas(): Observable<any> {
    // Ajusta el cuerpo de la solicitud según tus necesidades
    const body = {
      datasetId: '2b4f22a8-656e-4ecc-9fe4-489e9be01ba6',
      queries: [
        {
          query: 'EVALUATE VALUES(financials)',
        },
        // Agrega más consultas si es necesario
      ],
      serializerSettings: {
        includeNulls: true,
      },
      impersonatedUserName: 'MiguelFernandezSevillano@InStrategy100.onmicrosoft.com',
    };

    return this.http.post(this.apiUrlExecuteQueries, body);
  }
  */
}
