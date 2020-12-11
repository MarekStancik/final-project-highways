import { Component, OnInit } from "@angular/core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { pascalCase } from "pascal-case";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-user-view",
  templateUrl: "./user-view.component.html",
  styleUrls: ["./user-view.component.scss"]
})
export class UserViewComponent implements OnInit {

  links = [
    "info",
    "logs",
    "notifications"
  ];

  faUser = faUser;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  public pascal(val: string): string {
    return pascalCase(val);
  }
}
