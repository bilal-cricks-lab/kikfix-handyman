import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IMAGES from '../../../constants/Images';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import InputFields from '../../../components/TextInput';
import useInputText from '../../../data/InputText';
import { t } from 'i18next';
import { typography } from '../../../design-system/typography';

const SignIn = () => {
  const { input } = useInputText();
  const filterInput = input.filter(
    item => item.id === 'EmailPhone' || item.id === 'Password',
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoTextPos}>
        <View style={styles.imagePos}>
          <Image source={IMAGES.logo} style={styles.imageStyle} />
        </View>
        <View style={styles.welcomePos}>
          <Text style={typography.h1}>{t('onboarding.welcome')}</Text>
          <Text style={typography.bodySmall}>{t('auth.yourTrusted')}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputFieldView}>
          <InputFields inputData={filterInput} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoTextPos: {
    marginTop: verticalScale(40),
    gap: verticalScale(20),
  },
  imagePos: {
    alignItems: 'center',
  },
  imageStyle: {
    width: horizontalScale(170),
    height: verticalScale(60),
  },
  welcomePos: {
    alignItems: 'center',
    gap: verticalScale(10)
  },
  welcomeTextStyle: {
    fontSize: fontScale(16),
    fontFamily: 'Poppins-Regular',
    color: '#545454',
    width: horizontalScale(300),
    textAlign: 'center',
  },
  formContainer: {
    marginTop: verticalScale(50)
  },
  inputFieldView: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    gap: verticalScale(35),
  },
});

export default SignIn;

// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   ToastAndroid,
//   StyleSheet,
// } from 'react-native';
// import React from 'react';
// import Images from '../../../Constants/Images';
// import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
// import {
//   AuthenticatedBtnData,
//   socialBtnData,
//   socialBtnDataSign,
// } from '../../../Data/BtnData';
// import styles from './styles';
// import useInputData from '../../../Data/TextInput';
// import ForgotBtn from '../../../Components/Button/ForgotPassword';
// import LoginBtn from '../../../Components/Button/LoginBtn';
// import SocialBtn from '../../../Components/Button/SocialBtn';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {horizontalScale} from '../../../Utils/ScaleSize';
// import {useDispatch} from 'react-redux';
// import {setAuthCredential, setToken} from '../../../Redux/Action';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   verticalScale,
//   horizontalScale,
//   fontScale,
// } from '../../../utils/screenSize';
// import InputFields from '../../../components/TextInput';
// import useInputText from '../../../data/InputText';

// const SignIn = () => {
//   const [displayName, setDisplayName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [selected, setSelected] = React.useState(1);
//   const [focusedField, setFocusedField] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const navigation = useNavigation();
//   const { input } = useInputText();
//   const filterInput = input.filter(
//     item => item.id === 'EmailPhone' || item.id === 'Password',
//   );
//   // const {InputData, InputDetails} = useInputData();
//   // const dispatch = useDispatch();

//   // React.useEffect(() => {
//   //   GoogleSignin.configure({
//   //     webClientId:
//   //       '1043161679400-s95di5nu55sskm8icmmfroeeho02lfet.apps.googleusercontent.com',
//   //   });
//   // }, []);

//   // const handleFocus = field => setFocusedField(field);
//   // const handleBlur = () => setFocusedField(null);

//   // const handleInputChange = field => text => {
//   //   if (field === 'Username') setDisplayName(text);
//   //   else if (field === 'Email Address') setEmail(text);
//   //   else if (field === 'Password') setPassword(text);
//   // };

//   // const getIcon = (field, isFocused) => {
//   //   const color = isFocused ? '#33b056' : 'black';
//   //   switch (field) {
//   //     case 'Username':
//   //       return (
//   //         <MaterialCommunityIcons
//   //           name="account-outline"
//   //           size={20}
//   //           color={color}
//   //           style={{left: 5}}
//   //         />
//   //       );
//   //     case 'Email Address':
//   //       return (
//   //         <Fontisto name="email" size={19} color={color} style={{left: 5}} />
//   //       );
//   //     case 'Password':
//   //       return (
//   //         <MaterialCommunityIcons
//   //           name="lock-outline"
//   //           size={20}
//   //           color={color}
//   //           style={{left: 5}}
//   //         />
//   //       );
//   //     default:
//   //       return null;
//   //   }
//   // };

//   // const onPressSocial = id => {
//   //   id === 1 ? onGoogleSignIn() : id === 2 ? onFacebookLogIn() : null;
//   // };

//   // const onPressSocialSign = id => {
//   //   id === 1 ? onFacebookButtonPress() : id === 2 ? onGoogleRegister() : null;
//   // };

//   // const onFacebookLogIn = async () => {
//   //   try {
//   //     const {isCancelled} = await LoginManager.logInWithPermissions(['email']);
//   //     if (isCancelled) return console.log('Login cancelled');
//   //     const {accessToken} = await AccessToken.getCurrentAccessToken();
//   //     if (!accessToken) return console.log('Failed to get access token');
//   //     await auth().signInWithCredential(
//   //       auth.FacebookAuthProvider.credential(accessToken),
//   //     );
//   //     navigation.navigate('Tab');
//   //   } catch (error) {
//   //     console.error(error);
//   //     Alert.alert('Login Failed', error.message);
//   //   }
//   // };

//   // const onGoogleRegister = async () => {
//   //   try {
//   //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   //     const {idToken} = (await GoogleSignin.signIn()).data;
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   //     await auth().signInWithCredential(googleCredential);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const onGoogleSignIn = async () => {
//   //   try {
//   //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   //     const {idToken} = (await GoogleSignin.signIn()).data;
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   //     const result = await auth().signInWithCredential(googleCredential);
//   //     console.log(googleCredential);
//   //     console.log(result.user.displayName);
//   //     const data = {
//   //       name: result.user.displayName,
//   //     };
//   //     dispatch(setAuthCredential(data));
//   //     navigation.navigate('Tab');
//   //     return result;
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const onSignIn = async () => {
//   //   setLoading(true);
//   //   if (!displayName || !email || !password) {
//   //     Alert.alert('Error', 'Please enter all fields');
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   try {
//   //     const userCredential = await auth().createUserWithEmailAndPassword(
//   //       email,
//   //       password,
//   //     );
//   //     const user = userCredential.user;
//   //     await user.updateProfile({displayName});
//   //     const token = await user.getIdToken();
//   //     await AsyncStorage.setItem('userToken', token);
//   //     const data = {name: displayName, emailSend: email};
//   //     dispatch(setAuthCredential(data));
//   //     dispatch(setToken(token));
//   //     ToastAndroid.show('User Registered Successfully', ToastAndroid.SHORT);
//   //     navigation.navigate('Tab');
//   //   } catch (error) {
//   //     console.error('Error during sign up:', error.message);
//   //     Alert.alert('Error', error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const onLogIn = async () => {
//   //   setLoading(true);
//   //   if (!email || !password) {
//   //     Alert.alert('Error', 'Please enter all fields');
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   try {
//   //     const userCredential = await auth().signInWithEmailAndPassword(
//   //       email,
//   //       password,
//   //     );
//   //     const token = await userCredential.user.getIdToken();
//   //     await AsyncStorage.setItem('userToken', token);
//   //     dispatch(setToken(token));
//   //     ToastAndroid.show('Logged in Successfully', ToastAndroid.SHORT);
//   //     navigation.navigate('Tab');
//   //   } catch (error) {
//   //     console.error('Error during login:', error.message);
//   //     Alert.alert('Error', error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const renderInputFields = inputData => {
//   //   return inputData.map(({feild, ref, keyBoardType, nextRef}) => {
//   //     const isFocused = focusedField === feild;
//   //     return (
//   //       <View key={feild} style={{position: 'relative'}}>
//   //         <TextInput
//   //           ref={ref}
//   //           returnKeyType={
//   //             feild === 'Email Address'
//   //               ? 'next'
//   //               : feild === 'Username'
//   //               ? 'next'
//   //               : 'done'
//   //           }
//   //           keyboardType={keyBoardType}
//   //           style={[
//   //             styles.InputText,
//   //             {borderColor: isFocused ? '#33b056' : '#f0f0f0'},
//   //           ]}
//   //           onChangeText={handleInputChange(feild)}
//   //           placeholder={feild}
//   //           value={
//   //             feild === 'Email Address'
//   //               ? email
//   //               : feild === 'Username'
//   //               ? displayName
//   //               : password
//   //           }
//   //           onSubmitEditing={() => nextRef?.current?.focus()}
//   //           placeholderTextColor={isFocused ? '#33b056' : '#d8d8d8'}
//   //           onFocus={() => handleFocus(feild)}
//   //           onBlur={handleBlur}
//   //           secureTextEntry={feild === 'Password'}
//   //         />
//   //         <View
//   //           style={{
//   //             position: 'absolute',
//   //             left: horizontalScale(15),
//   //             top: '25%',
//   //           }}>
//   //           {getIcon(feild, isFocused)}
//   //         </View>
//   //       </View>
//   //     );
//   //   });
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.formContainerView}>
//         <View
//           style={[
//             styles.formContainer1,
//             selected === 2 && styles.formContainer2,
//           ]}
//         >
//           <View style={styles.loginSignUpContainerView}>
//             <View
//               style={[
//                 styles.loginSignUpContainer,
//                 { backgroundColor: selected === 1 ? '#33b056' : '#f2f2f2' },
//               ]}
//             >
//               {/* {AuthenticatedBtnData.map(
//                 ({id, title, buttonStyle, selectedStyle}) => (
//                   <TouchableOpacity
//                     onPress={() => setSelected(id)}
//                     key={id}
//                     style={[buttonStyle, selected === id && selectedStyle]}>
//                     <Text
//                       style={[
//                         selected === id ? styles.selectedText : styles.text,
//                       ]}>
//                       {title}
//                     </Text>
//                   </TouchableOpacity>
//                 ),
//               )} */}
//             </View>
//           </View>
//           {selected === 1 && (
//             <>
//               <View style={styles.LoginContainerView}>
//                 <View style={styles.LoginContainer}>
//                   <View style={styles.InputTextView}>
//                     <InputFields inputData={input} />
//                   </View>
//                   <View style={styles.ForgotView}>
//                     {/* <ForgotBtn
//                       onPress={() => navigation.navigate('Forgot')}
//                       title={'Forgot Password ?'}
//                     /> */}
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.loginWithView}>
//                 <Text style={styles.loginWithText}>or login with</Text>
//               </View>
//               <View style={styles.socialoginView}>
//                 {/* {socialBtnData.map((item, index) => (
//                   <View key={index}>
//                     <SocialBtn
//                       source={item.image}
//                       // onPress={() => onPressSocial(item.id)}
//                     />
//                   </View>
//                 ))} */}
//               </View>
//               <View style={styles.dontHaveAccountView}>
//                 <Text style={styles.dontHaveAccountText}>
//                   Don't have an account?
//                 </Text>
//                 <Text
//                   onPress={() => setSelected(2)}
//                   style={styles.registerBtnText}
//                 >
//                   Register Now
//                 </Text>
//               </View>
//               <View style={styles.loginBtnView}>
//                 {/* <LoginBtn
//                   onPress={onLogIn}
//                   title={
//                     loading ? (
//                       <ActivityIndicator color={'white'} size={25} />
//                     ) : (
//                       'LOGIN'
//                     )
//                   }
//                 /> */}
//               </View>
//             </>
//           )}
//           {selected === 2 && (
//             <>
//               <View style={styles.LoginContainerView}>
//                 <View style={styles.LoginContainer}>
//                   <View style={styles.InputTextView}>
//                     <InputFields inputData={input} />
//                     {/* {socialBtnDataSign.map((item, index) => (
//                       <TouchableOpacity
//                         onPress={() => onPressSocialSign(item.id)}
//                         key={index}
//                         style={styles.socialSignBtnStyle}>
//                         <Image source={item.image} />
//                         <Text
//                           style={
//                             item.id === 1
//                               ? styles.facebookBtnText
//                               : styles.googleBtnText
//                           }>
//                           {item.title}
//                         </Text>
//                       </TouchableOpacity>
//                     ))} */}
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.alreadyHaveAccountView}>
//                 <Text style={styles.alreadyHaveAccountText}>
//                   Already have an account?
//                 </Text>
//                 <Text onPress={() => setSelected(1)} style={styles.signInText}>
//                   Login Now
//                 </Text>
//               </View>
//               <View style={styles.sigInBtnView}>
//                 <TouchableOpacity
//                   // onPress={onSignIn}
//                   style={styles.signInBtnStyle}
//                 >
//                   {loading ? (
//                     <ActivityIndicator size="small" color="white" />
//                   ) : (
//                     <Text style={styles.signInBtnText}>SIGN IN</Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   HalfContainer: {
//     width: '100%',
//     height: verticalScale(260),
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     backgroundColor: '#33b056',
//     alignItems: 'center',
//   },
//   imageStyle: {
//     width: horizontalScale(210),
//     height: verticalScale(210),
//   },
//   formContainerView: {
//     alignItems: 'center',
//   },
//   formContainer1: {
//     // borderRadius: 10,
//     // width: horizontalScale(330),
//     // height: verticalScale(500),
//     // backgroundColor: 'white',
//     // shadowColor: 'black',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 5,
//     // elevation: 5,
//   },
//   formContainer2: {
//     // borderRadius: 10,
//     // width: horizontalScale(330),
//     // height: verticalScale(540),
//     // backgroundColor: 'white',
//     // shadowColor: 'black',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 5,
//     // elevation: 5,
//   },
//   loginSignUpContainerView: {
//     alignItems: 'center',
//     marginTop: verticalScale(25),
//   },
//   loginSignUpContainer: {
//     flexDirection: 'row',
//     width: horizontalScale(190),
//     height: verticalScale(40),
//     borderRadius: 25,
//     overflow: 'hidden',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   button1: {
//     width: horizontalScale(95),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f2f2f2',
//   },
//   button2: {
//     width: horizontalScale(95),
//     alignItems: 'center',
//     borderRadius: 25,
//     justifyContent: 'center',
//     backgroundColor: '#f2f2f2',
//   },
//   selected1: {
//     backgroundColor: '#33b056',
//   },
//   selected2: {
//     backgroundColor: '#33b056',
//   },
//   text: {
//     color: 'black',
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(14),
//   },
//   selectedText: {
//     color: 'white',
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(14),
//   },
//   LoginContainerView: {
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//   },
//   LoginContainer: {
//     width: horizontalScale(270),
//   },
//   InputTextView: {
//     marginTop: verticalScale(5),
//     gap: verticalScale(18),
//     alignItems: 'center',
//   },
//   InputText: {
//     padding: 5,
//     paddingLeft: horizontalScale(70),
//     fontFamily: 'Poppins-Regular',
//     lineHeight: 20,
//     fontSize: 13,
//     color: 'black',
//     width: horizontalScale(280),
//     height: verticalScale(45),
//     borderWidth: 1.5,
//     borderColor: '#f0f0f0',
//     backgroundColor: 'white',
//     borderRadius: 25,
//     textAlignVertical: 'center',
//   },
//   loginWithView: {
//     alignItems: 'center',
//     marginTop: verticalScale(20),
//   },
//   loginWithText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(12),
//     color: '#767676',
//   },
//   socialoginView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: verticalScale(25),
//     marginTop: verticalScale(20),
//   },
//   dontHaveAccountView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: horizontalScale(5),
//     marginTop: verticalScale(25),
//   },
//   dontHaveAccountText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(12),
//     color: '#767676',
//   },
//   registerBtnText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(12),
//   },
//   loginBtnView: {
//     alignItems: 'center',
//     marginTop: verticalScale(65),
//   },
//   socialSignBtnStyle: {
//     width: horizontalScale(270),
//     height: 45,
//     backgroundColor: 'white',
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ebebeb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   facebookBtnText: {
//     marginHorizontal: horizontalScale(40),
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(13),
//   },
//   googleBtnText: {
//     marginHorizontal: horizontalScale(40),
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(13),
//   },
//   alreadyHaveAccountView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: horizontalScale(5),
//     marginTop: verticalScale(25),
//   },
//   alreadyHaveAccountText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(12),
//     color: '#767676',
//   },
//   signInText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: verticalScale(12),
//   },
//   sigInBtnView: {
//     alignItems: 'center',
//     marginTop: verticalScale(60),
//   },
//   signInBtnStyle: {
//     width: verticalScale(130),
//     height: horizontalScale(45),
//     backgroundColor: '#33b056',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//   },
//   signInBtnText: {
//     fontFamily: 'Poppins-Medium',
//     color: 'white',
//     fontSize: verticalScale(15),
//   },
//   ForgotView: {
//     alignItems: 'flex-end',
//     marginTop: verticalScale(20),
//   },
// });

// export default React.memo(SignIn);
