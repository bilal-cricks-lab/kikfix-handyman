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
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30); // 30-second countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError('');

    if (value.length === 6) {
      // Navigate to next screen or do something here
    } else {
    }
  };

  const handleResend = () => {
    if (isResendDisabled) return;
    setOtp('');
    setError('');
    setIsResendDisabled(true);
    setTimer(30);
    console.log('OTP resent!');
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
          We've sent a 6-digit code to your phone number
        </Text>
        <View>
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.primary[40]}
            autoFocus
            //   hideStick
            placeholder=""
            blurOnFilled
            type="numeric"
            secureTextEntry={false}
            onTextChange={handleOtpChange}
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
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
