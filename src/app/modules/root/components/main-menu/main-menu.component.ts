import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { pascalCase } from "pascal-case";
import { UiStateService } from "src/app/shared/services/ui-state.service";

export interface MainMenuItem {
  name: string;
  icon: IconProp;
  route?: string;
  routes?: MainMenuItem[];
}

@UntilDestroy()
@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {
  @Input() menuItems: MainMenuItem[];
  @Input() routeOrder: number;
  @Input() header: string;

  @Output() changed = new EventEmitter();

  constructor(private router: Router, private uiState: UiStateService) {
  }

  ngOnInit(): void {
    const activate = (url: string) => {
      const currentRoute = url.split("/");
      const route = currentRoute[this.routeOrder];
      const name = this.menuItems.filter((x: MainMenuItem) => x.route === route)[0]?.name || pascalCase(route);
      this.uiState.topMenuTitle$.next(name);
    };

    activate(this.router.url);
    this.router.events.pipe(untilDestroyed(this)).subscribe(e => {
      if (e instanceof NavigationEnd) {
        activate(e.url);
      }
    });
  }
}
