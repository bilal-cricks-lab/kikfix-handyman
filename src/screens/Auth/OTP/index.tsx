import { colors, typography } from '../../../design-system';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useSelector } from 'react-redux';
import { RootSate } from '../../../redux/Store/store';
import { navigateToScreen } from '../../../utils/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import Toast from '../../../components/Error';
import { OTPSend, OTPVerify } from '../../../services/authServices';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
  });
  const [otpCount, setOtpCount] = useState<number | null>(null);

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const user_data = useSelector(
    (state: RootSate) => state.user_reg.regData?.email,
  );

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning',
  ) => {
    setToast({ visible: true, message, type });
  };

  useEffect(() => {
    let interval: any;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    const fetchOtpCount = async () => {
      try {
        const response = await OTPSend({ email: user_data });
        const count = response?.otp_count;

        if (count !== undefined) {
          setOtpCount(count);
        }
      } catch (err) {
        console.log('Failed to fetch OTP count on mount', err);
      }
    };

    fetchOtpCount();
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError('');
  };

  const handleVerifyPress = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    if (!user_data) {
      setError('Email is missing for OTP verification');
      return;
    }

    const data = {
      email: user_data,
      otp: Number(otp),
    };

    console.log('Payload:', data);

    try {
      setLoading(true);
      const response = await OTPVerify(data);
      showToast('OTP Verified', 'success');
      setTimeout(() => {
        navigateToScreen(navigation, 'SignIn');
      }, 2000);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.error('OTP Error:', errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;
    const data = { email: user_data };

    try {
      const OTPReSend = await OTPSend(data);
      const count = OTPReSend?.otp_count;
      if (count === 2) {
        setOtpCount(count);
      }

      setOtp('');
      setError('');
      setIsResendDisabled(true);
      setTimer(120);
      showToast(OTPReSend.message, 'success');
      console.log('OTP resent!');
      return OTPReSend;
    } catch (error: any) {
      console.log(error);
      const errMsg = error?.response?.data?.message;
      showToast(errMsg, 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.content}>
        <Text style={[typography.h2, styles.title]}>
          Enter Verification Code
        </Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>
          We've sent a 6-digit code to your Email Address
        </Text>

        <OtpInput
          numberOfDigits={6}
          focusColor={colors.primary[40]}
          autoFocus
          placeholder=""
          blurOnFilled
          type="numeric"
          secureTextEntry={false}
          onTextChange={(text: any) => handleOtpChange(text)}
          theme={{
            inputsContainerStyle: {
              flexDirection: 'row',
              gap: 0,
            },
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusStickStyle: { height: 0 },
          }}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading && (
          <ActivityIndicator
            style={{ marginTop: 16 }}
            size="small"
            color={colors.primary[40]}
          />
        )}

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResend}
          disabled={isResendDisabled}
        >
          <Text
            style={[
              typography.bodySmall,
              isResendDisabled && { color: '#9CA3AF' },
            ]}
          >
            {isResendDisabled
              ? `Resend code in 0:${timer.toString().padStart(2, '0')}`
              : 'Didn’t receive the code? '}
            {!isResendDisabled && (
              <Text
                style={{ ...typography.bodySmall, color: colors.primary[40] }}
              >
                Resend
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {otpCount !== null && (
        <Text style={{ marginTop: 16, color: '#6B7280', fontSize: 14 }}>
          OTP attempts: {otpCount}
        </Text>
      )}
      <TouchableOpacity
        onPress={handleVerifyPress}
        style={{
          backgroundColor: colors.primary[40],
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          marginTop: 24,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Verify OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen(navigation, 'SignIn')}
        style={{
          backgroundColor: colors.primary[40],
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          marginTop: 24,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to Login</Text>
      </TouchableOpacity>
      {toast && (
        <Toast
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
          message={toast.message}
          visible={toast.visible}
          type={toast.type}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  otpBox: {
    width: horizontalScale(45),
    height: verticalScale(45),
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  otpText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  errorText: {
    color: '#EF4444', // red-500
    marginTop: 12,
    fontSize: 14,
  },
  resendButton: {
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
