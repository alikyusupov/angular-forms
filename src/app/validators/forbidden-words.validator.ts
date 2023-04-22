import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const forbiddenWordValidator = (control: AbstractControl): ValidationErrors | null => {
    return control.value === 'test'
    ? { banned: { word: 'test' } }
    : null
}

export const forbiddenWordsValidator = (bannedWords: string[] = []): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const match = bannedWords.find(word => word === control.value)
        return !match ? null : { banned: { word: match } }
    } 
}