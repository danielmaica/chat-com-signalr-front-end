import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '../../shared/name-dialog/name-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export class Message {
  constructor(public userName: string, public text: string) {}
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  connection = new signalr.HubConnectionBuilder()
    .withUrl('https://localhost:44300/chat')
    .build();
  messages: Message[] = [];
  messageControl = new FormControl('');
  userName!: string;
  isConnected: boolean = false;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.openDialog();
  }
  ngOnInit(): void {}

  startConnection() {
    this.connection.on('newMessage', (message: Message) => {
      this.messages.push(message);
    });

    this.connection.on('newUser', (userName: string, connectionId: string) => {
      this.openSnackBar(userName);
    });

    this.connection.on('previousMessages', (messages: Message[]) => {
      this.messages = messages;
    });

    this.connection
      .start()
      .then(() => {
        this.connection.send(
          'newUser',
          this.userName,
          this.connection.connectionId
        );
        this.isConnected = true;
        console.log('Connection started');
      })
      .catch((err) => {
        this.isConnected = false;
        console.error('Error while starting connection: ', err);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: this.userName,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userName = result;
      this.startConnection();
      this.openSnackBar(result);
    });
  }

  openSnackBar(userName: string) {
    const msg =
      userName == this.userName
        ? 'Você entrou no chat.'
        : `${userName} entrou no chat.`;
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  sendMessage() {
    if (!this.isConnected || !this.messageControl.value) {
      return;
    }
    this.connection
      .send(
        'newMessage',
        new Message(this.userName, this.messageControl.value!)
      )
      .then(() => {
        this.messageControl.setValue('');
      });
  }
}
