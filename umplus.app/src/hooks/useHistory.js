import { useEffect, useMemo, useState } from "react"

export default (dip) => {
    const [history, setHistory] = useState([])
    useEffect(() => {
        const load = () => {
            if (dip) {
                dip.on().then(a => a.post('v1/user/transaction/history').then(data => {
                    if (data) {
                        setHistory(data)
                    }
                }))
            }
        }
        load()
        const i = setInterval(() => {
            load()
        }, 2000)
        return () => clearInterval(i)
    }, [])
    return history
}