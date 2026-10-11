import { Injectable, Directive, output } from '@angular/core';

@Directive()
@Injectable()
export class ArthuriusEventsService {

  readonly languageChanged = output<string>();

  emitLanguageChanged(language: string): void {
    this.languageChanged.emit(language);
  }
}
