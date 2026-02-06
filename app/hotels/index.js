import { Link } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import hotels from "../data/hotels.json";
import { getImageSource } from "../utils/getImageSource"; // 🔹 Utility import

export default function HotelList() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏨 Hotels in Kuakata</Text>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/hotels/[id]", params: { id: item.id } }}
            asChild
          >
            <Pressable style={styles.card}>
              {/* ✅ এখন helper function দিয়ে ইমেজ লোড */}
              <Image source={getImageSource(item)} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>{item.rent}</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 6,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: 100, height: 100, borderRadius: 8 },
  info: { flex: 1, padding: 8 },
  name: { fontSize: 18, fontWeight: "bold" },
  location: { fontSize: 14, color: "#666" },
  price: { fontSize: 14, color: "#008080" },
});