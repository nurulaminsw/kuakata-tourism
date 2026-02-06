import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import hotels from "../data/hotels.json";

// 🔹 লোকাল ইমেজ ম্যাপ (প্রথমেই রাখবে)
const localImages = {
  1: require("../../assets/hotels/1.jpg"),
  2: require("../../assets/hotels/2.jpg"),
  3: require("../../assets/hotels/3.jpg"),
};

export default function HotelDetails() {
  const { id } = useLocalSearchParams();
  const hotel = hotels.find((h) => h.id === Number(id));

  if (!hotel) {
    return (
      <View style={styles.center}>
        <Text>Hotel not found</Text>
      </View>
    );
  }

  const bannerImage = localImages[hotel.id];

  const handleCall = () => Linking.openURL(`tel:${hotel.phone}`);
  const handleMap = () =>
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.location,
      )}`,
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* 🔹 Header Banner */}
        <ImageBackground source={bannerImage} style={styles.banner}>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={StyleSheet.absoluteFillObject}
          />
        </ImageBackground>

        {/* 🔹 Info Card */}
        <Animatable.View
          animation="fadeInUp"
          delay={100}
          duration={700}
          style={styles.infoCard}
        >
          <Text style={styles.hotelName}>{hotel.name}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={18} color="#555" />
            <Text style={styles.locationText}>{hotel.location}</Text>
          </View>

          {/* ⭐ Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star-half" size={18} color="#FFD700" />
            <Text style={styles.ratingValue}>(4.5/5)</Text>
          </View>

          {/* About Section */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{hotel.about}</Text>

          {/* Rooms & Rent */}
          <Text style={styles.sectionTitle}>Rooms & Rent</Text>
          <View style={styles.rowBox}>
            <MaterialIcons name="king-bed" size={22} color="#E91E63" />
            <Text style={styles.roomDetail}>{hotel.rooms}</Text>
          </View>
          <View style={styles.rowBox}>
            <FontAwesome5 name="money-bill-wave" size={20} color="#4CAF50" />
            <Text style={styles.roomDetail}>{hotel.rent}</Text>
          </View>

          {/* Facilities */}
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilityContainer}>
            <View style={styles.facilityItem}>
              <Ionicons name="wifi" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>Free Wi‑Fi</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="restaurant" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>Restaurant</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="car-sport-outline" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>Parking</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="snow" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>Air Conditioning</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="bed" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>Comfortable Rooms</Text>
            </View>
            <View style={styles.facilityItem}>
              <Ionicons name="tv-outline" size={18} color="#0078D4" />
              <Text style={styles.facilityText}>LED TV</Text>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* 🔹 Sticky Bottom Buttons */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={handleMap}
          style={[styles.barBtn, { backgroundColor: "#0078D4" }]}
        >
          <Ionicons name="map" size={18} color="#fff" />
          <Text style={styles.btnText}>View on Map</Text>
        </Pressable>

        <Pressable
          onPress={handleCall}
          style={[styles.barBtn, { backgroundColor: "#E91E63" }]}
        >
          <Ionicons name="call" size={18} color="#fff" />
          <Text style={styles.btnText}>Call Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: "100%", height: 260, justifyContent: "flex-end" },
  bannerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    padding: 16,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  infoCard: {
    backgroundColor: "#fff",
    marginTop: -30,
    marginHorizontal: 14,
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  hotelName: { fontSize: 22, fontWeight: "bold", color: "#111" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  locationText: { fontSize: 14, color: "#555", marginLeft: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  ratingValue: { fontSize: 14, color: "#777", marginLeft: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: "#333",
  },
  aboutText: { fontSize: 14, color: "#555", lineHeight: 20 },
  rowBox: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  roomDetail: { fontSize: 15, color: "#444", marginLeft: 8 },
  facilityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    margin: 4,
  },
  facilityText: { marginLeft: 6, color: "#0078D4", fontWeight: "600" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  barBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "45%",
  },
  btnText: { color: "#fff", marginLeft: 6, fontWeight: "600", fontSize: 15 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
