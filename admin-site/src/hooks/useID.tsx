let id: Record<string, number> = {}

export default (name: string) => {
    if (id[name]) {
        id[name]++
    } else {
        id[name] = 1
    }
    return `${name}${id[name]}`
}