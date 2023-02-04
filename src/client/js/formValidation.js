const getPossibleFormValidationErrors = () => {
  const value = document.getElementById('user-input').value;
  const message = checkNotUndefinedOrEmpty(value);
  return message;
};

const checkNotUndefinedOrEmpty = (elementValue) => {
  if (!elementValue || elementValue.length === 0) {
    return 'Please provide some text before submitting this form for analysis!';
  } else {
    return undefined;
  }
};

export {getPossibleFormValidationErrors, checkNotUndefinedOrEmpty};
