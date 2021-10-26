import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ValidatorFormConstants } from '@shared/common/validators/constants/ValidatorFormConstants';

@Directive({
    selector: '[inputAlphaNumeric]'
})
export class AlphanumericDirective {

    @Input() inputAlphaNumeric: string;
    regexStr : string = ValidatorFormConstants.ALPHANUMERIC_PATTERN;
    regexStrNoSpace : string = ValidatorFormConstants.ALPHANUMERIC_PATTERN_NOSPACE;
    regexStrPassword : RegExp = ValidatorFormConstants.ALPHANUMERIC_PATTERN_PASSWORDS;

    constructor(private el : ElementRef){}

    @HostListener('keypress', ['$event']) onKeyPress(event){
        if(this.inputAlphaNumeric == "space"){
            return new RegExp(this.regexStr).test(event.key);
        }else if(this.inputAlphaNumeric == "password"){
            return new RegExp(this.regexStrPassword).test(event.key);
        }else{
            return new RegExp(this.regexStrNoSpace).test(event.key);
        }
    }

    @HostListener('paste', ['$event']) blockPaste(event : KeyboardEvent){
        this.validateFields(event);
    }

    validateFields(event){
        setTimeout(() => {
            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^a-zA-Z0-9\s ]/g, '').replace(/\s/g, '');
        }, 100)
    }
}