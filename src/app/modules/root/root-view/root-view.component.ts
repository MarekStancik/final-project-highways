import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faCogs } from "@fortawesome/free-solid-svg-icons";
import { filter, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { MainMenuItem } from "../components/main-menu/main-menu.component";

@Component({
  templateUrl: "./root-view.component.html",
  styleUrls: ["./root-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootViewComponent implements OnInit {

  menuItems: MainMenuItem[] = [
    {
      name: "Dashboard",
      icon: faAccusoft,
      route: "routes",
      canActivate$: this.auth.authData$.pipe(filter(d => !!d), map(d => d.permissions?.route?.includes("read")))
    },
    {
      name: "Users",
      icon: faAddressBook,
      route: "users",
      canActivate$: this.auth.authData$.pipe(filter(d => !!d), map(d => d.permissions?.user?.includes("read")))
    },
    {
      name: "Settings",
      icon: faCogs,
      route: "system",
      canActivate$: this.auth.authData$.pipe(filter(d => !!d), map(d => d.permissions?.device?.includes("read") || d.permissions?.node?.includes("read")))
    },
  ];

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }


}
