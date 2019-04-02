import store from "../store";
import * as ACTIONS from "./../actions/actionConstants";

const request = require("request");
const dbOptions = { 
  method: 'GET',
  url: 'https://pdubdb-705a.restdb.io/rest/workstations',
  headers: 
   { 
    'cache-control': 'no-cache',
    'x-apikey': '5c9a8400df5d634f46ecaf52',
   } 
 };

export function stationsFetchAll() = {
	request(dbOptions, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(body)
	  return body;
	});
}