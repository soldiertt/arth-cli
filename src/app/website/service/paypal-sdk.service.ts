import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

type PaypalNamespace = {
  createInstance: (options: {
    clientId: string;
    components: string[];
    pageType?: string;
  }) => Promise<any>;
};

@Injectable()
export class PaypalSdkService {
  private loadPromise: Promise<PaypalNamespace> | null = null;

  load(): Promise<PaypalNamespace> {
    if (this.loadPromise) {
      return this.loadPromise;
    }
    const existing = (window as any).paypal;
    if (existing && existing.createInstance) {
      this.loadPromise = Promise.resolve(existing as PaypalNamespace);
      return this.loadPromise;
    }
    this.loadPromise = new Promise<PaypalNamespace>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.coreScriptUrl();
      script.async = true;
      script.onload = () => {
        const paypal = (window as any).paypal;
        if (paypal && paypal.createInstance) {
          resolve(paypal as PaypalNamespace);
        } else {
          reject(new Error('PayPal Web SDK loaded but createInstance() is unavailable'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load the PayPal Web SDK'));
      document.head.appendChild(script);
    });
    return this.loadPromise;
  }

  private coreScriptUrl(): string {
    return environment.paypalEnvironment === 'production'
      ? 'https://www.paypal.com/web-sdk/v6/core'
      : 'https://www.sandbox.paypal.com/web-sdk/v6/core';
  }
}
