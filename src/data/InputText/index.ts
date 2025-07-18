import InputText from '../../types/input';
import { useFormRefs } from '../../hooks/useFormRefs';
import useAuth from '../../hooks/useAuth';

const useInputText = () => {
  const form_Ref = useFormRefs().form;
  const { state, updateState } = useAuth();

  const fieldSignin: {
    id: string;
    ref: keyof typeof form_Ref
    label: string;
    stateKey: keyof typeof state;
    placeholder: string;
    keyboardType?: 'default' | 'email-address';
    next?: keyof typeof form_Ref;
  }[] = [
    {
      id: 'email_phone',
      ref: 'email_Phone',
      label: 'Email',
      stateKey: 'email',
      placeholder: 'Enter your email',
      keyboardType: 'email-address',
      next: 'password',
    },
    {
      id: 'password',
      ref: 'password',
      label: 'Password',
      stateKey: 'password',
      placeholder: 'Enter Your Password',
      keyboardType: 'default',
      next: 'confirm_password',
    },
  ];

  const fieldSignUp : {
    id: string;
    ref: keyof typeof form_Ref,
    label: string;
    stateKey: keyof typeof state;
    placeholder: string;
    keyboardType?: 'default' | 'email-address';
    next?: keyof typeof form_Ref;
  }[] = [
    {
      id: 'full_name',
      ref: 'full_name',
      label: 'Full Name',
      stateKey: 'fullName',
      placeholder: 'Enter your full name',
      keyboardType: 'default',
      next: 'last_name',
    },
    {
      id: 'last_name',
      ref: 'last_name',
      label: 'Last Name',
      stateKey: 'lastName',
      placeholder: 'Enter Your Last Name',
      keyboardType: 'default',
      next: 'username',
    },
    {
      id: 'username',
      ref: 'username',
      label: 'Username',
      stateKey: 'username',
      placeholder: 'Enter Your Username',
      keyboardType: 'default',
      next: 'email_Phone',
    },
    {
      id: 'email_Phone',
      ref: 'email_Phone',
      label: 'Email',
      stateKey: 'regEmail',
      placeholder: 'Enter your email',
      keyboardType: 'email-address',
      next: 'password',
    },
    {
      id: 'password',
      ref: 'password',
      label: 'Password',
      stateKey: 'regPassword',
      placeholder: 'Create a password',
      keyboardType: 'default',
      next: 'confirm_password',
    },
    {
      id: 'confirm_password',
      ref: 'confirm_password',
      label: 'Confirm Password',
      stateKey: 'confirmPassword',
      placeholder: 'Confirm your password',
      keyboardType: 'default',
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      ref: 'confirm_password',
      stateKey: 'phoneNumber',
      placeholder: 'Enter Your Number',
      keyboardType: 'default',
    }
  ]

  const inputSignin: InputText[] = fieldSignin.map(
    ({ label, stateKey, placeholder, keyboardType = 'default', next, ref }) => ({
      id: label,
      ref: form_Ref[ref],
      value: state[stateKey],
      onChangeText: text => updateState(stateKey, text),
      keyboardType,
      nextRef: next ? form_Ref[next] : undefined,
      placeHolder: placeholder,
    }),
  );

  const inputSignUp: InputText[] = fieldSignUp.map(
    ({ label, stateKey, placeholder, keyboardType = 'default', next, ref }) => ({
      id: label,
      ref: form_Ref[ref],
      value: state[stateKey],
      onChangeText: text => updateState(stateKey, text),
      keyboardType,
      nextRef: next ? form_Ref[next] : undefined,
      placeHolder: placeholder,
    }),
  );

  return {
    inputSignUp,
    inputSignin,
    formValue: { state },
  };
};

export default useInputText;