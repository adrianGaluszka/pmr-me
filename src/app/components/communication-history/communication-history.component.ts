import { Component } from '@angular/core';

const ELEMENT_DATA = [
  {
    position: 1,
    name: 'Nazwa1',
    date: 1.0079,
    localization: 'H',
    radio: 'Baofeng UV-5R',
  },
  {
    position: 2,
    name: 'Nazwa2',
    date: 4.0026,
    localization: 'He',
    radio: 'Baofeng UV-5R',
  },
  {
    position: 3,
    name: 'Nazwa3',
    date: 6.941,
    localization: 'Li',
    radio: 'Baofeng UV-5R',
  },
];
@Component({
  selector: 'app-communication-history',
  templateUrl: './communication-history.component.html',
  styleUrls: ['./communication-history.component.scss'],
})
export class CommunicationHistoryComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'date',
    'localization',
    'radio',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
}
