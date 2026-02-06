import { Link } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const categories = [
  {
    id: 1,
    name: "Hotels",
    image: require("../assets/homeIcon/hotel.png"),
    link: "/hotels",
  },
  {
    id: 2,
    name: "Transport",
    image: require("../assets/homeIcon/transportations.png"),
    link: "/transports",
  },
  {
    id: 3,
    name: "Hospitals",
    image: require("../assets/homeIcon/hospital.png"),
    link: "/hospitals",
  }, {
    id: 3,
    name: "Place ",
    image: require("../assets/homeIcon/place.png"),
    link: "/place",
  },
];

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏖 Kuakata Tourism</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={item.link} asChild>
            <Pressable style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#006699",
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  image: { width: 60, height: 60, marginBottom: 10 },
  text: { fontSize: 18, color: "#333" },
});
