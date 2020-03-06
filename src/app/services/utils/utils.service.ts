import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  generateRandomInteger(min: number, max: number): number {
    return Math.round(min + Math.random() * (max - min));
  }

  convertNumberToArray(number: number): number[] {
    return Array.from(Array(number).keys());
  }

  getUniqueId() {
    return this.generateRandomInteger(1, 10000);
  }
}
