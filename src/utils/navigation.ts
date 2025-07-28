import StackParamList from '../types/stack';
import { NavigationProp } from '@react-navigation/native';

export const navigateToScreen = (
  navigation: NavigationProp<StackParamList>,
  screen: keyof StackParamList,
) => {
  navigation.navigate(screen);
};

export const resetNavigation = (
  navigation: NavigationProp<StackParamList>,
  screen: keyof StackParamList,
) => {
  navigation.reset({
    index: 0,
    routes: [{ name: screen }],
  });
};
