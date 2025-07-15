
// // This component is a placeholder for a checkbox component.
// // It currently does not implement any functionality or styles.
// // You can extend this component to include checkbox logic and styles as needed.

// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import Feather from 'react-native-vector-icons/Feather';
// import { horizontalScale, verticalScale } from '../../utils/screenSize';
// import CheckBoxProps from '../../types/checkProps';

// const CheckBox = ({ size, color, onPress }: CheckBoxProps) => {
//   return (
//     <View style={styles.checkBoxContainer}>
//       <Pressable style={styles.checkbox} onPress={onPress}>
//         <Feather name={'check'} size={size} color={color} />
//       </Pressable>
//       <Text style={styles.checkText}>Remember me</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   checkBoxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: horizontalScale(10),
//   },
//   checkbox: {
//     width: horizontalScale(25),
//     height: verticalScale(25),
//     borderWidth: 1.5,
//     borderColor: '#E8F0EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   checkText: {
//     fontSize: horizontalScale(12),
//     color: '#545454',
//     fontFamily: 'Poppins-Regular',
//   },
// });

// export default CheckBox;
