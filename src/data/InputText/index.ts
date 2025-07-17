import InputText from '../../types/input';
import { useFormRefs } from '../../hooks/useFormRefs';
import { useState } from 'react';

/* const useInputText = (inputTexts: InputText[]) => {
    const inputRefs = React.useRef<{ [key: string]: React.RefObject<any> }>({});

    // Initialize refs for each input text
    React.useEffect(() => {
        inputTexts.forEach(input => {
            inputRefs.current[input.id] = input.ref;
        });
    }, [inputTexts]);

    // Function to focus the next input
    const focusNextInput = (currentId: string) => {
        const currentIndex = inputTexts.findIndex(input => input.id === currentId);
        if (currentIndex >= 0 && currentIndex < inputTexts.length - 1) {
            const nextInput = inputTexts[currentIndex + 1];
            nextInput.ref.current?.focus();
        }
    };

    return { inputRefs, focusNextInput };
} */

const useInputText = () => {
  const form_Ref = useFormRefs().form;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const input: InputText[] = [
    {
      id: 'Full Name',
      ref: form_Ref.full_name,
      keyboardType: 'default',
      nextRef: form_Ref.email_Phone,
      placeHolder: 'Enter your full name',
    },
    {
      id: 'Email',
      ref: form_Ref.email_Phone,
      keyboardType: 'email-address',
      value: email,
      onChangeText: (text: string) => setEmail(text),
      nextRef: form_Ref.password,
      placeHolder: 'Enter your email',
    },
    {
      id: 'Password',
      ref: form_Ref.password,
      keyboardType: 'default',
      onChangeText: (text: string) => setPassword(text),
      nextRef: form_Ref.confirm_password,
      value: password,
      placeHolder: 'Create a password',
    },
    {
      id: 'Confirm Password',
      ref: form_Ref.confirm_password,
      keyboardType: 'default',
      placeHolder: 'Confirm your password',
    },
  ];
  return {
    input,
    formValue: {
        email, 
        password
    }
  };
};

export default useInputText;
