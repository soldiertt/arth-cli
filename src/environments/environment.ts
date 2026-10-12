// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  restEndpoint: '/api',
  paypalEnvironment: 'sandbox',
  paypalClientId: 'AWM97ZD5w8pGO3EeGBOPmJqCRAltflEBAVHO9W7Hp1nXa48_f1_vwnrfVfMqZyoGcw6Jf3qZvA2d_1j2',
  redirecturl: 'http://localhost:4200/authcallback'
};
