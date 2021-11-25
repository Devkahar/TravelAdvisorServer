const axios = require('axios');

const key = "4ec0effb18msh782b7dd34f6d8f1p118635jsn3cf88ea39561";
const getPlacesDetails = async (id,type) =>{
    console.log(id);
    const URL =  `https://travel-advisor.p.rapidapi.com/${type}/get-details`;
    const options = {
      params: {location_id: id, lang: 'en_US'},
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': `${key}`
      }
    }
    try {
      const data = await axios.get(URL,options);
    //   console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.message);
      return error;
    }
}

module.exports = {
    getPlacesDetails
};