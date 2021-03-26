import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIALS = [
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MATERIALS],
  exports: [...MATERIALS],
})
export class ThemeModule {}
