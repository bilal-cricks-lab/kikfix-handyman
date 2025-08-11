import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar, Check, ChevronDown } from 'lucide-react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';

interface SelectItem {
  label: string;
  value: string;
}

interface Props {
  items: SelectItem[];
  selectedValue?: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  custom_style?: ViewStyle,
}

const Select: React.FC<Props> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  leftIcon,
  custom_style,
}) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={custom_style}
        containerStyle={{
          borderRadius: 10,
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={item => {
          onValueChange(item.value);
        }}
        renderLeftIcon={() =>
          React.isValidElement(leftIcon) ? React.cloneElement(leftIcon) : null
        }
        renderRightIcon={() => (
          <View style={styles.rightIcon}>
            <ChevronDown size={18} color="#6B7280" />
          </View>
        )}
        renderItem={item => {
          const isSelected = item.value === selectedValue;
          return (
            <View style={styles.item}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: horizontalScale(15),
                }}
              >
                <Calendar color={'grey'} />
                <Text
                  style={[
                    styles.itemTextStyle,
                    isSelected && styles.selectedItemText,
                  ]}
                >
                  {item.label}
                </Text>
              </View>

              <View>{isSelected && <Check size={16} color="#10B981" />}</View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    paddingLeft: horizontalScale(18),
    fontSize: fontScale(14),
    borderColor: '#D9D9D9',
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    width: horizontalScale(370),
  },
  placeholderStyle: {
    fontSize: fontScale(15),
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#111827',
  },
  itemTextStyle: {
    fontSize: 14,
    color: '#374151',
  },
  icon: {
    marginRight: 8,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItemText: {
    color: '#10B981',
    fontWeight: '600',
  },
  rightIcon: {
    marginRight: horizontalScale(12),
  },
});

export default Select;
