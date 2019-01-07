import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as morseCodes from "../assets/morse-code.json";
import { Code } from './code.js';

@Injectable({
  providedIn: 'root'
})
export class MorseCodeService {
  codesTranslator: { [key: string]: string } = {};
  lettersTranslator: { [key: string]: string } = {};

  constructor() {
    (<Code[]>morseCodes.default).forEach(mc => {
      this.codesTranslator[mc.morse] = mc.character;
      this.lettersTranslator[mc.character] = mc.morse;
    });
  }

  codifyMessage(message: string): Observable<string> {
    let codifyMessage: string = '';
    for (let i = 0; i < message.length; i++) {
      if (message[i] !== ' ')
        codifyMessage += this.lettersTranslator[message[i]];
      codifyMessage += ' ';
    }
    return of(codifyMessage.trim());
  }

  decodifyMessage(morseCode: string): Observable<string> {
    let morseCodes: string[] = morseCode.split(' ');
    console.log(morseCodes)

    let decodifyMessage: string = '';
    for (let i = 0; i < morseCodes.length; i++) {
      if (!morseCodes[i])
        decodifyMessage += ' ';
      else
        decodifyMessage += this.codesTranslator[morseCodes[i]]
    }
    return of(decodifyMessage.trim());
  }
}

