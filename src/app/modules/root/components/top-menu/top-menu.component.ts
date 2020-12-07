import { Component, OnInit } from "@angular/core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {

  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

  openQuickMenu() {

  }

}
