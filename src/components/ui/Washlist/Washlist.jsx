import { useEffect, useState } from "react";
import { useFirestore } from "../../../services/firestore";
import { useAuth } from "../../../features/useAuth";
import styles from "./Washlist.module.css"
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Washlist() {
    const { user } = useAuth()
    const { getData } = useFirestore()
    const [washlist, setWashlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.uid) {
            getData(user.uid).then((data) => {
                setWashlist(data)    
            }).catch((error) => {
                console.log(error, "error")
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [user.uid])

    const onClick = (id) => {
        navigate(`/title/${id}`)
    }

    return ( 
        <div className={styles.washlist}>
            <Typography variant="h6" mb={2}>Избранное</Typography>
            <div className={styles.washlistWrapper}>
                {washlist.map((i) => (
                    <div onClick={() => onClick(i.id)} key={i.id} className={styles.washlistCard}>
                        <img src={i.poster} alt="" />
                        {i.title}
                    </div>
                ))}
            </div>
        </div>
     );
}

export default Washlist;