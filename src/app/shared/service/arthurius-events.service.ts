import {Injectable, Output, EventEmitter} from '@angular/core';

@Injectable()
export class ArthuriusEventsService {

  @Output() languageChanged: EventEmitter<string> = new EventEmitter();

  emitLanguageChanged(language: string): void {
    this.languageChanged.emit(language);
  }
}
