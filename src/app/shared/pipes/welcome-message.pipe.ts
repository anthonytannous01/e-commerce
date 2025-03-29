import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'welcomeMessage',
})
export class WelcomeMessagePipe implements PipeTransform {
  transform(name: string): string {
    return `Welcome to SIMPLYCART, ${name}!`
  }
}
