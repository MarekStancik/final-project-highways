import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {Router} from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface MainMenuItem {
  name: string;
  icon: IconProp;
  route?: string;
  routes?: MainMenuItem[];
}

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {
  @Input() menuItems: MainMenuItem[];
  @Input() selected: MainMenuItem;
  @Input() routeOrder: number;
  @Input() header: string;

  @Output() changed = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initRouter();
  }

  private initRouter(): void {
    const currentRoute = this.router.url.split("/");
    const route = currentRoute[this.routeOrder];
    if (!route) {
      this.selected = this.menuItems[0];
    } else {
      this.selected = this.menuItems.filter((x: MainMenuItem) => x.route === route)[0];
    }
  }

  selectItem(item: MainMenuItem): void {
    this.selected = item;
    this.router.navigate(["app", item.route]);
    this.changed.emit(item);
  }
}
