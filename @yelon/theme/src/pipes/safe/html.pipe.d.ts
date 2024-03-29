import { PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class HTMLPipe implements PipeTransform {
    private readonly dom;
    transform(html: string): string | SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<HTMLPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HTMLPipe, "html", true>;
}
