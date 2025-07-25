import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import { User, Clock, DollarSign } from 'lucide-react-native';

interface Props {
  name: string | any;
  email: string | any;
  role: string | any;
  avatar: string | any;
  onProfilePress?: () => void;
  onHistoryPress?: () => void;
  onEarningsPress?: () => void;
}

const UserCard = ({
  name,
  email,
  role,
  avatar,
  onProfilePress,
  onHistoryPress,
  onEarningsPress,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.topSection}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Actions */}
      <TouchableOpacity style={styles.row} onPress={onProfilePress}>
        <User size={20} color="#000" style={styles.icon} />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={onHistoryPress}>
        <Clock size={20} color="#000" style={styles.icon} />
        <Text style={styles.label}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={onEarningsPress}>
        <DollarSign size={20} color="#000" style={styles.icon} />
        <Text style={styles.label}>Earnings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 5,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    marginLeft: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  role: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
});

export default UserCard;
