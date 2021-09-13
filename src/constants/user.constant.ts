export const userNameRange = { min: 6, max: 20 };
export const userNameError = `username must be a string containing ${userNameRange.min} to ${userNameRange.max} characters`;

export const nameRange = { min: 2, max: 20 };
export const nameError = `name must be a string containing ${nameRange.min} to ${nameRange.max} characters`;

export const countryRange = { min: 3, max: 30 };
export const countryError = `country must be a string containing ${countryRange.min} to ${countryRange.max} characters`;

export const ageRange = { min: 1, max: 200 };
export const ageError = `age must be a number in range ${ageRange.min} to ${ageRange.max}`;
