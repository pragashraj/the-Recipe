import axios from 'axios'

const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=3f8a8cbce62b9bb642745801478712ce";
const apiId = "&app_id=b32179fc";
const maxTime = "&time=30";
const maxIngreds = `&ingr=10`;

const API_KEY="08b99a7e0e12220737573be14114740b";
const API_ID="b32179fc"

export default axios.create({
    baseURL:`https://api.edamam.com/search?q=chicken&ingr=2&app_id=${API_ID}&app_key=${API_KEY}`,
    
})