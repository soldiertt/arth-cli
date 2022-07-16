import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable()
export class ArthuriusEventsService {

  @Output() languageChanged: EventEmitter<string> = new EventEmitter();

  emitLanguageChanged(language: string): void {
    this.languageChanged.emit(language);
  }
}
