import React from "react";
import InputText from "../../types/input.types";
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
    const full_name = React.useRef<any>(null);
    const email_Phone = React.useRef<any>(null);
    const password = React.useRef<any>(null);

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
            keyboardType: 'default'
        }
    ]
    return {
        input
    }
}

export default useInputText;