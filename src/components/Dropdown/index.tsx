import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ChevronDown, Check, Calendar } from 'lucide-react-native';

interface SelectItem {
  label: string;
  value: string;
}

interface Props {
  items: SelectItem[];
  selectedValue?: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
}

const Select: React.FC<Props> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    items.find(item => item.value === selectedValue)?.label || placeholder;
  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.triggerText}>{selectedLabel}</Text>
        <ChevronDown size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* Dropdown */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.dropdown}>
            <ScrollView>
              {items.map(item => {
                const isSelected = item.value === selectedValue;
                return (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.item}
                    onPress={() => {
                      onValueChange(item.value);
                      setVisible(false);
                    }}
                  >
                    <Calendar size={20} color={'black'}/>
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && <Check size={16} color="#10B981" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  triggerText: {
    color: '#111827',
    fontSize: 14,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '80%',
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    elevation: 10,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedText: {
    color: '#10B981', // green
    fontWeight: '600',
  },
});

export default Select;
