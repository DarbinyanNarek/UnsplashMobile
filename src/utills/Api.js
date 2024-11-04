import React from "react";
import axios from "axios";

export const HomeKey = "N2-4nxC97AJxDdYH-_x953QZL6TA1gsVZbcaebwOLi8"

const api = axios.create({
  baseURL: "https://api.unsplash.com",
});


export default class Api {
  static getPhoto(params) {
    return api("/photos", {params});
  }
  static searchPhoto(params) {
    return api("search/photos", {params});
  }
  static getUserData(params) {
    return api(`users/${params.username}`, {params});
  }
  static getUserPhotos(params){
    return api.get(`/users/${params.username}/photos`,{params})
  }
  static getCollection(params) {
    return api(`/users/${params.username}/collections`, {params});
  }
  static getCollectionPhoto(params){
    return api(`/collections/${params.id}/photos`, {params})
  }
  static getUserCollectionData(params){
    return api.get(`/collections/${params.id}`,{params})
  }

}

