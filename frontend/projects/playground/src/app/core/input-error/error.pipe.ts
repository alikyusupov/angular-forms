import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ERROR_MESSAGES_TOKEN } from './input-error.constant';

@Pipe({
  name: 'errorpipe'
})
export class ErrorPipe implements PipeTransform {

  constructor( @Inject(ERROR_MESSAGES_TOKEN) private readonly errorMessages:{ [key: string]: (arg?: any) => string } ){}

  transform(key: string, value: any): string {
    if(!this.errorMessages[key]){
      console.warn('Error handler is not created!')
      return ''
    }
    return this.errorMessages[key](value)
  }

}
