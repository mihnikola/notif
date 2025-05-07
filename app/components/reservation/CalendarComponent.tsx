import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import React from "react";
import Loader from "@/components/Loader";
import CardFutureReservation from "@/app/components/reservation/CardFutureReservation";
import CardNoReservation from "@/app/components/reservation/CardNoReservation";
import useReservations from "./hooks/useReservations";

const CalendarComponent = () => {
  const { reservations, isLoading, checkReservationHandler, check } = useReservations();
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.containerCapture}>
        <Text
          style={[styles.capture, check && styles.active]}
          onPress={checkReservationHandler}
        >
          Future
        </Text>
        <Text
          style={[styles.capture, !check && styles.active]}
          onPress={checkReservationHandler}
        >
          Past
        </Text>
      </View>
      <View style={styles.greyLine} />
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ display: "flex" }}>
          {check && reservations?.length > 0 ? (
            <CardFutureReservation reservations={reservations} />
          ) : (
            check && reservations?.length === 0 && <CardNoReservation />
          )}
          {!check && reservations?.length > 0 ? (
            <CardFutureReservation reservations={reservations} />
          ) : (
            !check && reservations?.length === 0 && <CardNoReservation />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  active: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  containerCapture: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    position: "absolute",
    top: 240,
  },
  greyLine: {
    width: "100%",
    height: 4,
    backgroundColor: "grey",
    marginTop: -1,
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
  },
});
