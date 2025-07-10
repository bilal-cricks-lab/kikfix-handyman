import React from "react";
import InputText from "../../types/input.types";
import { TextInput } from "react-native";
import { PhoneInputRef } from 'rn-phone-input-field';

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
    // Create a ref for the input text
    const full_name = React.useRef<TextInput>(null as unknown as TextInput);
    const email_Phone = React.useRef<TextInput>(null as unknown as TextInput);
    const password = React.useRef<TextInput>(null as unknown as TextInput);
    const phone_ref = React.useRef<PhoneInputRef>(null as unknown as PhoneInputRef);
    
    const input: InputText[] = [
        {
            id: 'FullName',
            ref: full_name,
            keyboardType: 'default',
            nextRef: email_Phone
        },
        {
            id: 'EmailPhone',
            ref: email_Phone,
            keyboardType: 'email-address',
            nextRef: password
        },
        {
            id: 'Password',
            ref: password,
            keyboardType: 'default',
            nextRef: phone_ref,
        },
        {
            id: 'PhoneNumber',
            keyboardType: 'phone-pad',
            ref: phone_ref as React.RefObject<TextInput | PhoneInputRef>,}
    ]
    return {
        input
    }
}

export default useInputText;