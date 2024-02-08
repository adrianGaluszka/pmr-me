// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/',
  firebaseConfig: {
    apiKey: 'AIzaSyB_Hg6RTKAMVuSkPYG6_M00AshzYKTaQFk',
    authDomain: 'pmr-me-43dae.firebaseapp.com',
    databaseURL:
      'https://pmr-me-43dae-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'pmr-me-43dae',
    storageBucket: 'pmr-me-43dae.appspot.com',
    messagingSenderId: '1006263787731',
    appId: '1:1006263787731:web:79bdbb984f900e0d82b426',
    measurementId: 'G-K3FGYLVQ5K',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
