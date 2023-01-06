import { FormControl } from '@angular/forms';

export interface Uf {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Ivp {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Dolar {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface DolarIntercambio {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Euro {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Ipc {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Utm {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Imacec {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Tpm {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface LibraCobre {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface TasaDesempleo {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Bitcoin {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: Date;
  valor: number;
}

export interface Indicador {
  version: string;
  autor: string;
  fecha: Date;
  uf: Uf;
  ivp: Ivp;
  dolar: Dolar;
  dolar_intercambio: DolarIntercambio;
  euro: Euro;
  ipc: Ipc;
  utm: Utm;
  imacec: Imacec;
  tpm: Tpm;
  libra_cobre: LibraCobre;
  tasa_desempleo: TasaDesempleo;
  bitcoin: Bitcoin;
}

export interface DialogData {
  mode: string;
  indicadoresList: string[];
  indicador: string;
  date: FormControl;
}

export interface Serie {
  fecha: Date | string;
  valor: number;
}

export interface IndicadorByDate {
  id: number;
  version: string;
  autor: string;
  codigo: string;
  nombre: string;
  unidad_medida: string;
  serie: Serie[];
}