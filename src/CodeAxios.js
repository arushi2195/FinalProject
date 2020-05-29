import axios from 'axios';


export const axiosCall = route => {
  console.log('request=====> ' + JSON.stringify(route));
  return new Promise(async (resolve, reject) => {
    axios(route)
      .then(res => {
        console.log('response======> ' + JSON.stringify(res));
        resolve(res);
      })
      .catch(error => {
        console.log('error=====> ' + JSON.stringify(error.response));
      
       
        reject(error.response);
      });
  });
};