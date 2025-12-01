export function setLocal<T = unknown>(key: string, value: T) {
    
    localStorage.setItem(key, JSON.stringify(value))

}

export function getLocal<T = unknown>(key: string): T | undefined {
    try {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : undefined
    } catch (e) {
        return undefined
    }
}

export function removeLocal(key: string) {
    try {
        localStorage.removeItem(key)
    } catch (e) { }
}
