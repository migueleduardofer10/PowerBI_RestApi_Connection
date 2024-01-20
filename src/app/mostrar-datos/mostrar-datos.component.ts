import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-mostrar-datos',
  templateUrl: './mostrar-datos.component.html',
  styleUrls: ['./mostrar-datos.component.css'],
})
export class MostrarDatosComponent implements OnInit {
  datosSaveDatasets: any;
  datosExecuteQueries: any;

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.datosService.obtenerDatosSaveDatasets().subscribe((data) => {
      this.datosSaveDatasets = data;
      console.log('Datos sobre mi dataset: ', this.datosSaveDatasets);
    });
    /*
    this.datosService.ejecutarConsultas().subscribe((data) => {
      this.datosExecuteQueries = data;
      console.log('Datos Execute Queries: ', this.datosExecuteQueries);
    });
  */
  }
}
