/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      'hammerjs': 'npm:hammerjs/hammer.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',


          
        
         
            '@progress': 'npm:@progress',
        
            // other libraries
        
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'hammerjs': 'npm:hammerjs/hammer.js',

            'angular2-fontawesome': 'npm:angular2-fontawesome',

  
            'angular2-material-datepicker': 'npm:angular2-material-datepicker',
            //'angular2-image-upload': 'npm:angular2-image-upload',
            //'angular2-text-mask': 'npm:angular2-text-mask',
            //'angular2-bootstrap-switch': 'node_modules/angular2-bootstrap-switch',
           // "ng2-ckeditor": "npm:ng2-ckeditor",
            //"angular2-tooltip": "npm:angular2-tooltip",
            "ng2-imageupload": "node_modules/ng2-imageupload",
            
      // CDK individual packages
      '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
      //'ng2-input-autocomplete': 'node_modules/ng2-input-autocomplete/bundles/ng2-input-autocomplete.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'tslib':                     'npm:tslib/tslib.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {

      app: {
        main: './main.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
        },
      "ng2-imageupload": {
          main: "index.js",
          defaultExtension: "js"
      },
      //"ng2-input-autocomplete": {
      //    main: "index.js",
      //    defaultExtension: "js"
      //},
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
