import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./system-view.component.html",
  styleUrls: ["./system-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemViewComponent implements OnInit {

  menuItems = [
    {
      name: "Nodes",
      path: "nodes"
    },
    {
      name: "Devices",
      path: "devices"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
