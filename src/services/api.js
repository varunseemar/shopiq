import axios from 'axios'

export const FetchData = async ()=>{
    try{
        const response = await axios.get('https://dummyjson.com/products');
        return response;
    }
    catch(err){
        throw new Error(err.response.data.message)
    }
}

export const FetchProductData = async ({id})=>{
    try{
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response;
    }
    catch(err){
        throw new Error(err.response.data.message)
    }
}