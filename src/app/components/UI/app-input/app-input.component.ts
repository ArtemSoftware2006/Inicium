import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass ],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AppInputComponent
  }],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss'
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() type: string = "text";
  @Input() id: string = "";
  @Input() name: string = "";
  @Input() placeholder!: string;
  @Input() label: string = "label";
  @Input() value = "";
  @Input() disabled = false;
  @Input() errors: ValidationErrors | null = null;
  touched = false;  
  isActive: boolean = false;
  isFilled: boolean = false;
  
  notifyOnTouched = () => {  }
  onChange(_value?: string) {
    this.isFilled = !!this.value;
  }
  onTouched() {
    if (!this.touched) {
      this.touched = true;
      this.notifyOnTouched(); 
    }
    this.isActive = false;
    this.isFilled = !!this.value;
  }

  onFocus() {
    this.isFilled = false;
    this.isActive = true;
  }

  onInput(value: string) {
    this.value = value;
    this.isFilled = this.isActive ? false : !!this.value;
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: (_?: string) => void) {
    this.onChange = onChange;
  }
  registerOnTouched(fn: () => void): void {
    this.notifyOnTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}