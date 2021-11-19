const axios = require('axios');

const key = "42aa039cbfmshee326db8eb75280p125554jsn359b0ed12bfd";
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