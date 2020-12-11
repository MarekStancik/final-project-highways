import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faCogs } from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: "./root-view.component.html",
  styleUrls: ["./root-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootViewComponent implements OnInit {

  menuItems: any = [
    {
      name: "Dashboard",
      icon: faAccusoft,
      route: "routes"
    },
    {
      name: "Users",
      icon: faAddressBook,
      route: "users"
    },
    {
      name: "Settings",
      icon: faCogs,
      route: "system"
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }


}
