import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-field',
  templateUrl: './detail-field.component.html',
  styleUrls: ['./detail-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailFieldComponent {

  @Input() name: string;
  @Input() value: any;
  @Input() public format: "default" | "date" = "default";

  constructor() { }
}
