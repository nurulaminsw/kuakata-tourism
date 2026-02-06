// app/utils/getImageSource.js

// লোকাল ইমেজ ম্যাপ (ID বা নামের ভিত্তিতে)
const localHotelImages = {
  1: require("../../assets/hotels/1.jpg"),
  2: require("../../assets/hotels/2.jpg"),
  3: require("../../assets/hotels/3.jpg"),
};

// Common utility function
export const getImageSource = (item) => {
  // কোনো item‐এর image field নাও
  const path = item?.image;

  // যদি অনলাইন লিংক হয় (http দিয়ে শুরু), তার মানে এটা network‑image
  if (path && path.startsWith("http")) {
    return { uri: path };
  }

  // নাহলে লোকাল ফাইলের জন্য map থেকে দাও (id দিয়ে খোঁজে)
  if (localHotelImages[item?.id]) {
    return localHotelImages[item.id];
  }

  // কোনো file না পাওয়া গেলে fallback
  return require("../../assets/images/icon.png"); // একটা default placeholder রাখো
};
