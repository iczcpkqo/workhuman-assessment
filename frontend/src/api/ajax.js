import axios from 'axios'
const HOSTER = {
    TEST:  "http://localhost:9000/"
}

export default function ajax(url='executeQuery',data={},type='GET', hoster='TEST'){

    // https://robin-server-api.herokuapp.com/event/read_all


    const h = HOSTER[hoster];
    url = h+url;
    const axiosInstance =  axios.create({
        timeout: 8000,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "x-requested-with"
        }
    });

    return new Promise(function (resolve,reject){
        let promise
        if(type === 'GET'){
            promise = axiosInstance.get(url, {params:data})//query parameter
        }
        else if(type === 'POST') {
            promise = axiosInstance.post(url,data)
        }
        else if(type === 'DELETE') {
            promise = axiosInstance.delete(url,data)

        }else if(type === 'PATCH'){
            promise = axiosInstance.patch(url,data)
        }
        else {
            promise = axiosInstance.put(url,data)
        }

        console.log(type + ' : ' + url + ' : ' + promise);

        promise.then(response =>{
            // if success
            resolve(response)
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    })
}

