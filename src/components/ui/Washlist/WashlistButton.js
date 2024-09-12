import { useState } from "react"
import { useFirestore } from "../../../services/firestore"

export const onSaveToWashlist = async(animeData, user) => {
    const { addDocument, addToWashList, chekIfInWashList } = useFirestore()
    const data = {
        id: animeData.id,
        title: animeData.names.ru,
        poster: `https://anilibria.top${animeData.posters.small.url}`
    }

    const dataId = String(animeData.id)

    // addDocument("washlist", data)
    await addToWashList(user.uid, dataId, data)
}