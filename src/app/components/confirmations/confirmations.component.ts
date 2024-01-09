import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Confirmation } from 'src/app/models/confirmation.interface';
import { WebsocketStateService } from 'src/app/services/websocket-state.service';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss'],
})
export class ConfirmationsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'date',
    'localization',
    'radio',
    'actions',
  ];
  dataSource: Confirmation[] = [];

  constructor(private readonly websocketState: WebsocketStateService) {}

  @ViewChild(MatTable) table!: MatTable<Confirmation>;

  ngOnInit(): void {
    this.websocketState.$confirmationsValueChanges.subscribe((res) => {
      console.log('NOTIFICATIONS:', res);
      this.dataSource = res;
      this.table.renderRows();
    });
  }

  // TO REFACTOR
  onConfirm(element: any): void {
    console.log('accepted: ', element);
  }

  onDimiss(element: any): void {
    console.log('dimissed: ', element);
  }
}
