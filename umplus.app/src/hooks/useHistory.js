import { useEffect, useMemo, useState } from "react"
import useMe from "./useMe"

export default (dip) => {
    const [history, setHistory] = useState([])
    const me = useMe()
    useEffect(() => {
        const load = () => {
            if (dip) {
                dip.fetch('user/transaction/history', 'POST').then(data => {
                    if (data) {
                        setHistory(data)
                    }
                })
            }
        }
        load()
        const i = setInterval(() => {
            load()
        }, 2500)
        return () => clearInterval(i)
    }, [])
    return history
}