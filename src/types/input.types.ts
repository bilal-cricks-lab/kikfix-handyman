import { TextInput } from "react-native";

type InputText = {
    id: string;
    ref: React.RefObject<TextInput>;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad',
    nextRef?: React.RefObject<TextInput>;
}

export default InputText;