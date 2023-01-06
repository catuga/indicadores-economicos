import { IndicadorByDate } from './interfaces';
import { AddEditIndicadorComponent } from './add-edit-indicador/add-edit-indicador.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatTable } from '@angular/material/table';
import { ConfirmDeletionComponent } from './confirm-deletion/confirm-deletion.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  indicadoresList: string[] = [];
  isEditing: boolean = false;
  selectedDate = moment();
  selectedId: number;
  selectedIndicador: string;
  displayedColumns: string[] = ['index', 'nombre', 'fecha', 'valor', 'unidad_medida', 'acciones'];
  dataSource: IndicadorByDate[] = [{
    "id": 1560608769632,
    "version": "1.7.0",
    "autor": "mindicador.cl",
    "codigo": "uf",
    "nombre": "Unidad de fomento (UF)",
    "unidad_medida": "Pesos",
    "serie": [
      {
        "fecha": "2023-01-01T03:00:00.000Z",
        "valor": 35122.26
      }
    ]
  }];

  @ViewChild(MatTable) table: MatTable<IndicadorByDate>;

  constructor(private appService: AppService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getIndicadores();
  }

  getIndicadores(): void {
    this.appService.getIndicadores()
      .subscribe((indicadores) => {
        const forDeletion = ['version', 'autor', 'fecha'];
        this.indicadoresList = Object.keys(indicadores).filter(item => !forDeletion.includes(item));
      });
  }

  openDialog(mode: string, element?: IndicadorByDate) {
    if (mode === 'add') {
      this.selectedIndicador = '';
      this.selectedDate = moment();
      this.selectedId = 0;
    } else if (mode === 'edit') {
      this.selectedIndicador = element?.codigo || '';
      this.selectedDate = moment(element?.serie[0]?.fecha);
      this.selectedId = element?.id || 0;
    }

    const dialogRef = this.dialog.open(AddEditIndicadorComponent, {
      data: {
        mode,
        id: this.selectedId,
        indicadoresList: this.indicadoresList,
        indicador: this.selectedIndicador,
        date: moment(this.selectedDate)
      }
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (mode === 'add' && result && result.indicador && result.date) {
          this.addIndicador(result);
        } else if (mode === 'edit' && result && result.indicador && result.date) {
          this.updateIndicador(result)
        }
      });
  }

  confirmDeletion(index: number) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {})

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.splice(index, 1);
        this.table.renderRows();
      }
    });
  }

  addIndicador(indicador: { date: Date, id: number, indicador: string, indicadorList: string[], mode: string }) {
    this.appService.getIndicadorWithDate(indicador.indicador, moment(indicador.date).format('DD-MM-YYYY'))
      .subscribe(result => {
        if (result && result.serie && result.serie[0] && result.serie[0].valor && result.serie[0].fecha) {
          this.dataSource.push({ ...result, id: Math.floor(Math.random() * 100) });
          this.table.renderRows();
        } else {
          this.snackBarAlert('add');
        }
      })
  }

  updateIndicador(indicador: { date: Date, id: number, indicador: string, indicadorList: string[], mode: string }) {
    this.dataSource = this.dataSource.filter((value) => {
      if (value.id == indicador.id) {
        this.appService.getIndicadorWithDate(indicador.indicador, moment(indicador.date).format('DD-MM-YYYY'))
          .subscribe(result => {
            if (result && result.serie && result.serie[0] && result.serie[0].valor && result.serie[0].fecha) {
              value.serie[0].fecha = result.serie[0].fecha;
              value.serie[0].valor = result.serie[0].valor;
              this.table.renderRows();
            } else {
              this.snackBarAlert('edit');
            }
          })
      }
      return true;
    });
  }

  snackBarAlert(mode: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        text: `Hubo un problema ${mode === 'add' ? 'agregando' : 'editando'} indicador para la fecha`
      }
    });
  }
}
