import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faBacon, faCogs, faCubes } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";

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
