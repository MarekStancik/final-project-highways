import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  templateUrl: "./login-view.component.html",
  styleUrls: ["./login-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent implements OnInit {

  public loginGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    remember: new FormControl(false, Validators.required)
  });

  public loading$ = new BehaviorSubject(false);

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.loading$.next(true);
    this.auth.login(this.loginGroup.value).subscribe(res => {
    }, e => {
      this.loading$.next(false);
    });
  }
}
