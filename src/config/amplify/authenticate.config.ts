export const authenticateConfig = {
  formFields: {
    signUp: {
      email: {
        order: 1,
        isRequired: true,
      },
      name: {
        label: "First Name",
        placeholder: "First Name",
        order: 2,
        isRequired: true,
        type: "string",
      },
      family_name: {
        label: "Last Name",
        placeholder: "Last Name",
        order: 3,
        isRequired: true,
        type: "string",
      },
      username: {
        order: 4,
        isRequired: true,
        type: "string",
      },
      phone_number: {
        order: 5,
        dialCode: "+977",
        isRequired: true,
        type: "tel",
      },
      gender: {
        label: "Gender",
        placeholder: "Male",
        order: 6,
        isRequired: true,
        type: "string",
      },
      birthdate: {
        label: "Birthday",
        order: 7,
        isRequired: true,
        type: "date",
      },
      password: {
        order: 8,
      },
      confirm_password: {
        order: 9,
      },
    },
  },
};
