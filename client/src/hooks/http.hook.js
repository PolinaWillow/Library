import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback (async (url, method = 'GET', body = null, headers = {}) =>{
        setLoading(true)
        try{
            if (body) {//Перевод передаваемых данных к строке
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                console.log('Body: '+ body)
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    })
    return {loading, request, error, setError}
}