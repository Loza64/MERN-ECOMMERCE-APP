export const VerifyAge = (value) => {
  const birthDate = new Date(value);
  const currentlyDate = new Date();

  let age = currentlyDate.getFullYear() - birthDate.getFullYear();

  const currentlyMonth = currentlyDate.getMonth();
  const birthMonth = birthDate.getMonth();

  // Verifica si aún no ha llegado el cumpleaños de este año
  if (currentlyMonth < birthMonth || ((currentlyMonth === birthMonth) && (birthDate.getDate() > currentlyDate.getDate()))) {
    age--;
  }

  if (birthDate > currentlyDate) {
    throw new Error("The date must not be greater than the current date")
  } else if (age < 18) {
    throw new Error("You must be over 18 years old to continue")
  }

  return true
}