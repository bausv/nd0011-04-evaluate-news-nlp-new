import { checkNotUndefinedOrEmpty } from "./formValidation";

test('empty input should result in form validation message', () => {
   expect(checkNotUndefinedOrEmpty()).toBe('Please provide some text before submitting this form for analysis!');
});

test('non-empty input should result in undefined', () => {
   expect(checkNotUndefinedOrEmpty('not empty')).toBeUndefined();
})