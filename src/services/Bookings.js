import { Firebase, Database } from "../integrations/firebase";
import moment from "moment";

export default class Bookings {

  // check to see if in operating hours for example 9-5
  static addBooking(startDate, endDate, numOfGuests) { // this can be refactored later
    return new Promise((resolve, reject) => {
      const uid = Firebase.auth().currentUser.uid;
      // Query for all bookings, check start / end dates
      Database.collection("bookings").get()
      .then(querySnapshot => {
        if (Bookings.checkCollisions(querySnapshot, startDate, endDate)) {
          // There was a collision
          reject("there was a conflict in dates");
        } else {
          // Add to database
          Database.collection("bookings").add({
            owner: uid,
            startDate: startDate,
            endDate: endDate,
            guests: numOfGuests,
            created: new Date(),
          })
          .then(docRef => {
            resolve(docRef.id);
          })
          .catch(err => {
            reject(err);
          });
        }
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  static viewBookings() {
    return new Promise((resolve, reject) => {
      const uid = Firebase.auth().currentUser.uid;
      // Query for all bookings owned by current user
      Database.collection("bookings").where("owner", "==", uid).get()
      .then(querySnapshot => {
        let bookings = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          bookings.push({
            id: doc.id,
            owner: data.owner,
            guests: data.guests,
            startDate: data.startDate,
            endDate: data.endDate,
            created: data.created,
          });
        });
        resolve(bookings);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  // TO-DO
  static cancelBooking(id) {
    // check if current user owns this booking id
  }

  // TO-DO
  static updateBooking(id) {
    // check if current user owns this booking id
  }

  // Checks to see if there are any collisions with dates when making a new booking
  static checkCollisions(querySnapshot, startDate, endDate) {
    for (let doc of querySnapshot.docs) {
      const data = doc.data();
      const newDate = { start: startDate.valueOf(), end: endDate.valueOf() };
      const currDate = { start: data.startDate.seconds * 1000, end: data.endDate.seconds * 1000 };
      if (moment(newDate.start).isBetween(moment(currDate.start), moment(currDate.end)) ||
          moment(newDate.end).isBetween(moment(currDate.start), moment(currDate.end))) {
        return true;
      }
    }
    return false;
  }

}