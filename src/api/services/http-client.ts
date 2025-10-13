import axios from 'axios';

console.log(process.env);

export const httpClient = axios.create({
  baseURL: process.env.GLOSSARY_BACK_URL + '/',
})
