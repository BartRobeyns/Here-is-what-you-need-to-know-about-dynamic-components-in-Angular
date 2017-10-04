import {Compiler, Component, Injector, ViewChild, ViewContainerRef} from "@angular/core";

declare const System;

@Component({
    moduleId: module.id,
    selector: 'lac-a-component',
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})

export class LACAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    constructor(private _compiler: Compiler, private _injector: Injector) {

    }

    ngAfterViewInit() {
      const self = this;
      setTimeout(function() {
        System.import('app/loaded-and-compiled/lac-lazy.module.js').then((module) => {
            self._compiler.compileModuleAndAllComponentsAsync(module.LACLazyModule)
                .then((compiled) => {
                    const factory = compiled.componentFactories[0];
                    self._container.createComponent(factory);
                })
        })
      },5000);
    }
}