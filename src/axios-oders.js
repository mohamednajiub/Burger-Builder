import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-bbfb9.firebaseio.com/',

});

export default instance;