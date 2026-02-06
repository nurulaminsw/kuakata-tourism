import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import transports from "../data/transports.json";
import { getImageSource } from "../utils/getImageSource"; // ✅ helper import

export default function TransportList() {
  // ✅ Phone handler inside component
  const handleCall = (phone) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.card}>
      {/* 🔹 Transport image */}
      <Image source={getImageSource(item)} style={styles.image} />

      {/* 🔹 Transport Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <View style={styles.row}>
          <Ionicons name="navigate-outline" size={14} color="#555" />
          <Text style={styles.route}>{item.route}</Text>
        </View>

        {/* Timing */}
        <View style={styles.timing}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={14}
            color="#999"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.timeText}>
            {item.depart_time} → {item.arrival_time}
          </Text>
        </View>

        {/* Rent info */}
        <Text style={styles.price}>{item.rent}</Text>

        {/* 🔹 Call Button */}
        <Pressable
          onPress={() => handleCall(item.phone)}
          style={styles.callBtn}
        >
          <Ionicons name="call-outline" size={16} color="#fff" />
          <Text style={styles.callText}>Call Now</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚐 Transport Services in Kuakata</Text>
      <FlatList
        data={transports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB", padding: 10 },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0078D4",
    marginVertical: 10,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  info: { flex: 1, paddingLeft: 10, justifyContent: "space-evenly" },
  name: { fontSize: 17, fontWeight: "700", color: "#111" },
  type: { fontSize: 13, color: "#0078D4", marginBottom: 2 },
  route: { fontSize: 13, color: "#555", marginLeft: 4, flexShrink: 1 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  timing: { flexDirection: "row", alignItems: "center" },
  timeText: { fontSize: 12, color: "#676767" },
  price: {
    fontSize: 14,
    color: "#008080",
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 6,
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0078D4",
    borderRadius: 20,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  callText: { color: "#fff", marginLeft: 6, fontSize: 13, fontWeight: "600" },
});
