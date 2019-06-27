// eslint-disable-next-line
import { fsdb, rtdb } from "./firebase";
import store from "../store";
import * as ACTIONS from "./../actions/actionConstants";
//UID
// import uuidv4 from "uuid/v4";

const hostsCollection = fsdb.collection("hosts");

const watchCollection = function(collection, ...filters) {
  let state = store.getState();
  switch(collection) {
    case "HOSTS": { collection = hostsCollection; break }
    default: return
  }
  collection
  // .where(filters[0], == filters[1])
  .onSnapshot(function(querySnapshot) {
    //update state with this data...
    console.log("i'm Watching")
    querySnapshot
    .docChanges()
    .forEach(change => {
      if (change.type === "added") {
        let data = change.doc.data();
        console.log("New event", change.doc.data())
        let doc = {}
        doc[change.doc.id] = data;
        store.dispatch({type: ACTIONS.EVENTS_API_RESULT, payload: doc})
      }
      if (change.type === "modified") {
        console.log("Modified event", change.doc.data())
        let data = change.doc.data();

        //update state (state.events.byId & state.events.allIds)
        // console.log(state.events.byId)
        console.log(data)
        // store.dispatch({type: ACTIONS.EVENTS_API_RESULT, payload: {...state.events.byId, data}})
      }
      if (change.type === "removed") {
        let data = change.doc.data();
        console.log("Deleted event", change.doc.data()._id)
        // store.dispatch({type: ACTIONS.EVENTS_API_RESULT, payload: data})
        //remove eventID from users, venues
      }
    });
  });
};

const watchDocument = function(collection, id) {
  console.log("i'm Watching")
  switch(collection) {
    case "EVENTS": { collection = eventsCollection; break }
    case "VENUES": { collection = venuesCollection; break }
    case "TALENTS": { collection = talentsCollection; break }
    default: return
  }
  collection
  .doc(id)
  // .where(filters[0], == filters[1])
  .onSnapshot({
    includeMetadataChanges: true
  },function(docSnapshot) {
    let doc = {}
    //update state with this data...
    doc[docSnapshot.id] = docSnapshot.data();
    console.log(doc)
    store.dispatch({type: ACTIONS.EVENTS_API_RESULT, payload: doc})
  });
};

const unWatchCollection = function(filter){
  fsdb.collection(filter)
    .onSnapshot(function () {});
}
const unWatchDocument = function(filter, id){
  fsdb.collection(filter)
    .doc(id)
    .onSnapshot(function () {});
}
// == EVENTS == //
const eventsCreate = function(data) {
  // console.log("submitting to db...", data)
  let ref = eventsCollection.doc()
  return (
    ref.set({...data,
    _id: ref.id
    }, function(error) {
      if (error) {
        return error
      } else {
        return ref.id
      }
    })
    .then(() => ref.id)
    .catch( error => error)
  )
};
const eventsCreate2 = function(data) {
  // console.log("submitting to db...", data)
  return (
    eventsCollection
    .add(data)
    .then( docRef => {
      //RETURN THE NEW DOCUMENT'S ID FOR REFERENCE
      // console.log(docRef)
      return docRef.id
    })
    .catch( error => {
      console.log(error)
      return error
    })
  )
};
const eventsFetchAll = function() {
  //return {"eventId": {eventData}}
  return (
    eventsCollection
      .get()
      .then(querySnapshot => {
        let docs = {};
        querySnapshot.forEach(doc => {
          docs[doc.id] = doc.data()
        });
        return docs;
      })
      .catch(error => {
        console.log(error);
        return error;
      })
  );
}; 

const eventsFetchOne = function(uid) {
  let doc = {}
  return (
    uid ? eventsCollection.doc(uid)
    .get()
    .then( docSnapshot => {
      doc[docSnapshot.id] = docSnapshot.data();
      return doc
    }).catch( error => {
      console.log(error)
      return error;
    }) : null
  );
};
const fetchEventWhere = function(param, query) {
  const queryRef = eventsCollection.where( param,"==", query );
  return queryRef.get().docs().forEach(doc => {
    console.log(doc)
  });
};
const eventsUpdate = function(uid, data) {}
const eventsDelete = function(uid) {}
// == VENUES == //
const venuesCreate = function(data) {
  // console.log("submitting to db...", data)
  let ref = venuesCollection.doc()
  ref.set({...data,
    _id: ref.id
  }, function(error) {
    if (error) {
      console.log(error)
    } else {
      console.log("Yay")
      return ref.id
    }
  })
  return ref.id;
};

const venuesFetchAll = function() {
  return venuesCollection.get().then(querySnapshot => {
    let docs = {};
    querySnapshot.forEach(doc => {
      docs[doc.id] = doc.data();
    });
    return docs;
  });
};

const venuesFetchFew = function(venuesObj) {
  console.log(venuesObj);
  let promises = [];
  Object.keys(venuesObj).forEach( id => {
    console.log(id);
    return venuesCollection.doc(id)
    .get()
    .then( doc => promises.push(doc.data()) )
    .catch( error => error);
  })
  console.log(promises)
}

const venuesFetchOne = function(venueId) {
    return venuesCollection.doc(venueId)
    .get()
    .then(doc => doc.data())
    .catch( error => error); //Needs Venue
};
const venuesUpdate = function(uid, data) {}
const venuesDelete = function(uid) {
  return (
    venuesCollection
    .doc(uid)
    .delete()
    .then( () => {
      console.log(`Document ${uid} deleted successfully.`)
    }).catch( (error) => {
      console.warn(error)
    })
  );
};


// == TALENTS == //
const talentsCreate = function(data) {
  return talentsCollection
    .add(data)
    .then(docRef => {
      // console.log(docRef);
      return docRef.id;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}
const talentsFetchAll = function(uid) {}
const talentsFetchOne = function(uid) {}
const talentsUpdate = function(uid, data) {}
const talentsDelete = function(uid) {}

export { watchDocument, unWatchDocument, venuesFetchFew,
  unWatchCollection, watchCollection, eventsFetchOne, 
  eventsFetchAll, fetchEventWhere, eventsCreate, 
  eventsDelete, eventsUpdate, venuesCreate, 
  venuesFetchOne, venuesFetchAll, venuesUpdate, 
  venuesDelete, talentsCreate, talentsFetchAll, 
  talentsFetchOne, talentsUpdate, talentsDelete };
