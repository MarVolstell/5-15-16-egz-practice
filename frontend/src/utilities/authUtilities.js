const API_URL = 'http://localhost:8000/api/v0';

const getAuthHeaders = (token)=>({
    'Content-Type': 'application/json',
    ...(token && {Authorization: `Bearer ${token}`})
})
 
const fetchRequest = async (url, options = {}, token) =>{
    try{
        const response = await fetch(`${API_URL}${url}`,{
            ...options,
            headers: {...getAuthHeaders(token), ...options.headers}
        });
         
        const contentType = response.headers.get('content-type')
 
        if(!response.ok){
            if(contentType && contentType.includes('application/json')){
                const errorData = await response.json()
                const message =
                    errorData.message || errorData.error|| errorData.msg || 'Ivyko klaida'
                console.error('Klaidos atsakymas is serverio:', errorData)
                throw new Error(message)
            }else{
                const text = await response.text();
                throw new Error(text || `HTTP error: ${response.status}`)
            }
        }
 
        return await response.json()
 
    }catch(err){
        console.log('Uzklausos klaida: ', err.message);
    }
}

export default fetchRequest