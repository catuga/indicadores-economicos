import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../interfaces';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

export const CUSTOM_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  }
};

@Component({
  selector: 'app-add-edit-indicador',
  templateUrl: './add-edit-indicador.component.html',
  styleUrls: ['./add-edit-indicador.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMAT }
  ]
})
export class AddEditIndicadorComponent implements OnInit {
  indicadores: string;
  indicadoresList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditIndicadorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.indicadoresList = this.data.indicadoresList;
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.data.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.data.date.setValue(ctrlValue);
    datepicker.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
