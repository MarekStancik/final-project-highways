import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faArrowLeft, faPencilAlt, faTimes, faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DetailViewMode } from "src/app/shared/models/detail-view-mode";

@Component({
  selector: "app-detail-header",
  templateUrl: "./detail-header.component.html",
  styleUrls: ["./detail-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailHeaderComponent implements OnInit {

  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Input() isSubmitting: boolean;
  @Input() mode: DetailViewMode;
  @Output() deleteEvent = new EventEmitter();
  @Input() icon: IconDefinition;
  @Input() title: string;
  @Input() createTitle: string;
  public faTrash = faTrash;
  public faPencil = faPencilAlt;
  public faArrow = faArrowLeft;
  public faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  public delete(): void {
    this.deleteEvent.emit();
  }

}
