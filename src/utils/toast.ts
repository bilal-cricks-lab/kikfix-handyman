export const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
  ({ visible: true, message, type });
};
