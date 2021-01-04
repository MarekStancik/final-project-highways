import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";
import { Auth } from "src/app/shared/models/auth.model";
import { UserModel } from "src/app/shared/models/user.model";
import { UserService } from "src/app/modules/users/user.service";
import { DefaultDetailViewComponent } from "../../components/data/default-detail-view/default-detail-view.component";

@Component({
  templateUrl: "./user-detail-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailViewComponent {

  @ViewChild(DefaultDetailViewComponent) child: DefaultDetailViewComponent<UserModel>;

  public roles: Auth.AuthorizationType[] = ["admin", "manager", "user", "techie"];
  public icon = faUser;
  public group = new FormGroup({
    username: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    authorization: new FormControl("user"),
    enabled: new FormControl(true)
  });
  public object$ = new BehaviorSubject<UserModel>(null);

  constructor(public userService: UserService) { }

  public changeEnabled(): void {
    const current = this.object$.value;
    this.group.patchValue(Object.assign({}, current, { enabled: !current.enabled }));
    this.child.submit();
  }

}
