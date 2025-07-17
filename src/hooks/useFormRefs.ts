import React from 'react';

export const useFormRefs = () => {
  const form_Ref = React.useRef({
    full_name: null,
    email_Phone: null,
    password: null,
    confirm_password: null,
  });
  const form = form_Ref.current;
  return {
    form,
  };
};
