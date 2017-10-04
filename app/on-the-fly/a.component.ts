import {Compiler, Component, Injector, NgModule, NgModuleRef, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'otf-a-component',
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})

export class OTFAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>) {
    }

    ngAfterViewInit() {
      const self = this;
      setTimeout(function() {
          const template = '<span>I am {{name}}</span>';

          const tmpCmp = Component({template: template})(class {
          });
          const tmpModule = NgModule({declarations: [tmpCmp]})(class {
          });


          self._compiler.compileModuleAndAllComponentsAsync(tmpModule)
          .then((factories) => {
            const f = factories.componentFactories[0];
            const cmpRef = f.create(self._injector, [], null, self._m);
            cmpRef.instance.name = 'B component';
            self._container.insert(cmpRef.hostView);
          })
        }, 5000);
    }
}