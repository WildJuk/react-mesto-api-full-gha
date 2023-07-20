export const renderLoading = (formSelector, isLoading) => {
  console.log(formSelector, document.querySelector(formSelector))
  const submitButton = document.querySelector(`${formSelector} .form__submit-button`);
  if(isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
};
