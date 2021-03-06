export const handleError = (name: string, value: string, length: number) => {
  if (value.trim() === "") {
    return {
      isValid: false,
      error: `Please enter your ${name}`,
    };
  } else if (value.trim().length < length) {
    return {
      isValid: false,
      error: `${name} must be of atleast ${length} characters.`,
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const handleEmailValidation = (value: string) => {
  const regex = /\S+@\S+\.\S+/;

  if (value.trim() === "") {
    return {
      isValid: false,
      error: `Please enter your email address.`,
    };
  } else if (!regex.test(value)) {
    return {
      isValid: false,
      error: "Please enter valid email address.",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};
