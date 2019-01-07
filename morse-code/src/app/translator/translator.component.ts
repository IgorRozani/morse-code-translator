import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';
import { MorseCodeService } from '../morse-code.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private morseCodeService: MorseCodeService) {
    this.form = this.formBuilder.group({
      Message: [null, null],
      Code: [null, null]
    });
  }

  ngOnInit() {
  }

  translate(): void {
    console.log(this.form.value)
    if (!this.form.value.Message && !this.form.value.Code) {
      alert("Informe a message or a morse code to translate")
      return;
    }

    if (this.form.value.Message) {
      this.morseCodeService.codifyMessage(this.form.value.Message).subscribe(c =>
        this.form.patchValue({
          Code: c
        }));
    } else {
      this.morseCodeService.decodifyMessage(this.form.value.Code).subscribe(m =>
        this.form.patchValue({
          Message: m
        }));
    }
  }

  listenCode(): void {
  }

  clean(): void {
    this.form.reset();
  }

  isMorseCode(event): boolean {
    return event.key === "." || event.key === "-" || event.key === " "
  }

  $scope
}
