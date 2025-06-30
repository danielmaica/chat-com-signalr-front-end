import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-name-dialog',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './name-dialog.component.html',
  styleUrl: './name-dialog.component.scss',
})
export class NameDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public name: string,
    public dialogRef: MatDialogRef<NameDialogComponent>
  ) {}
}
