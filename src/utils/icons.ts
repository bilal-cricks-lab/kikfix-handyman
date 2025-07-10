import { ImageSourcePropType } from "react-native";
import IMAGES from "../constants/Images";

const icons = (id: string) => {
    switch(id) {
        case 'FullName':
            return IMAGES.user
        case 'EmailPhone': 
            return IMAGES.email
        case 'Password':
            return IMAGES.password
    }
}

export const getIcon = (id: string): ImageSourcePropType => {
    const icon = icons(id);
    return icon || IMAGES.user; // Default to user icon if no specific icon found
}

export default icons;