import { environment as env } from './../environments/environment';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  private editorSubject: Subject<any> = new AsyncSubject();
  public apiKey: string = env.tinyApiKey!;

  form!: FormGroup;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(),
    });
  }

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  getInnerValue() {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.form.controls['content'].value
    );
  }
}
