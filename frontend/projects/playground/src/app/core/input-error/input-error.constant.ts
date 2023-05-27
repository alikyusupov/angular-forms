import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGES: { [key: string]: (arg?: any) => string } = {
    required: () => 'The field is heavily required',
    minlength: (value) => `Invalid length (less than ${value.requiredLength} characters)`,
    email: () => 'Email is so invalid',
    requiredTrue: () => 'The field is mandatory'
}

export const ERROR_MESSAGES_TOKEN = new InjectionToken('Validation messages', {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES
})