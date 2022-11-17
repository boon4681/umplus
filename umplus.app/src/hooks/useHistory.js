import { useEffect, useMemo, useState } from "react"

export default (dip) => {
    const [history, setHistory] = useState([])
    useEffect(() => {
        const load = () => {
            if (dip) {
                dip.fetch('v1/user/transaction/history', 'POST').then(data => {
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