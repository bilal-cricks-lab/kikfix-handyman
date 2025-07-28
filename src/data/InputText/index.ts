import InputText from '../../types/input';
import { useFormRefs } from '../../hooks/useFormRefs';
import useAuth from '../../hooks/useAuth';

const useInputText = () => {
  const reg_form = useFormRefs().reg_form;
  const login_form = useFormRefs().signIn_form

  const { state, updateState } = useAuth();

  const fieldSignin: {
    id: string;
    ref: keyof typeof login_form
    label: string;
    stateKey: keyof typeof state;
    placeholder: string;
    keyboardType?: 'default' | 'email-address';
    next?: keyof typeof login_form;
  }[] = [
    {
      id: 'email',
      ref: 'email',
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
    },
  ];

  const fieldSignUp : {
    id: string;
    ref: keyof typeof reg_form,
    label: string;
    stateKey: keyof typeof state;
    placeholder: string;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    next?: keyof typeof reg_form;
  }[] = [
    {
      id: 'first name',
      ref: 'full_name',
      label: 'First Name',
      stateKey: 'fullName',
      placeholder: 'Enter your full name',
      keyboardType: 'default',
      next: 'last_name',
    },
    {
      id: 'last name',
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
      id: 'email',
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
      id: 'confirm password',
      ref: 'confirm_password',
      label: 'Confirm Password',
      stateKey: 'confirmPassword',
      next: 'phone_number',
      placeholder: 'Confirm your password',
      keyboardType: 'default',
    },
    {
      id: 'phone number',
      ref: 'phone_number',
      label: 'Phone Number',
      stateKey: 'phoneNumber',
      placeholder: 'Enter Your Number',
      keyboardType: 'phone-pad',
    }
  ]

  const inputSignin: InputText[] = fieldSignin.map(
    ({ label, stateKey, placeholder, keyboardType = 'default', next, ref }) => ({
      id: label,
      ref: login_form[ref],
      value: state[stateKey],
      onChangeText: text => updateState(stateKey, text),
      keyboardType,
      nextRef: next ? login_form[next] : undefined,
      placeHolder: placeholder,
    }),
  );

  const inputSignUp: InputText[] = fieldSignUp.map(
    ({ id, stateKey, label, placeholder, keyboardType = 'default', next, ref }) => ({
      id: id,
      label: label,
      ref: reg_form[ref],
      value: state[stateKey],
      onChangeText: text => updateState(stateKey, text),
      keyboardType,
      nextRef: next ? reg_form[next] : undefined,
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