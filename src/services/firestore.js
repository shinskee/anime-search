import { db } from "../services/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const useFirestore = () => {
    const addDocument = async(collectionName, data) => {
        const docRef = await addDoc(collection(db, collectionName), data);
          console.log("Document written with ID: ", docRef.id);
    }

    const addToWashList = async (userId, dataId, data) => {
        try {
            // if (await chekIfInWashList(userId, dataId)) {

            // }
            await setDoc(doc(db, "users", userId, "washlist", dataId), data);
        } catch (error) {
            console.log(error, "Error adding document");
            
        }
    }

    const chekIfInWashList = async (userId, dataId) => {
        const docRef = doc(
            db, 
            "users", 
            userId.toString(),
            "washlist",
            dataId.toString())
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return true
        } else {
            return false
        }
    }

    const removeFromWashList = async (userId, dataId) => {
        try {
            await deleteDoc(doc(
                db, 
                "users", 
                userId.toString(),
                "washlist",
                dataId.toString())
            )
        } catch (error) {
            console.log(error, "Error while deleting doc"); 
        }
    }

    const getData = async (userId) => {
        const querySnapshot = await getDocs(collection(db, "users", userId, "washlist"));
        const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data()
        }));
        return data
    }

    return {
        addDocument, addToWashList, chekIfInWashList, getData, removeFromWashList
    }
}