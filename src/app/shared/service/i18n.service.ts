import {Injectable} from "@angular/core";
import frenchLanguage from "../i18n/fr";
import dutchLanguage from "../i18n/nl";
import englishLanguage from "../i18n/en";
import {SessionService} from "./session.service";
import {ArthuriusEventsService} from "./arthurius-events.service";

@Injectable()
export class I18nService {

  private fr: any;
  private nl:any;
  private en: any;

  currentLanguage: string;

  constructor(private sessionService: SessionService, private eventsService: ArthuriusEventsService) {
    this.fr = frenchLanguage;
    this.nl = dutchLanguage;
    this.en = englishLanguage;
    let lang = this.sessionService.getLang();
    if (lang) {
      this.currentLanguage = lang;
    } else {
      this.currentLanguage = "fr";
    }
  }

  isFr(): boolean {
    return this.currentLanguage === 'fr';
  }

  isNl(): boolean {
    return this.currentLanguage === 'nl';
  }

  isEn(): boolean {
    return this.currentLanguage === 'en';
  }

  saveLang(lang: string): void {
    this.currentLanguage = lang;
    this.sessionService.saveLang(lang);
    this.eventsService.emitLanguageChanged(lang);
  }

  translate(key: string): string {
    var keys = key.split('.');
    let translation = this[this.currentLanguage];
    for (let i = 0; i < keys.length; i++) {
      if (translation) {
        translation = translation[keys[i]];
      } else {
        return "[" + key + "]";
      }
    }
    return translation;
  }
}

