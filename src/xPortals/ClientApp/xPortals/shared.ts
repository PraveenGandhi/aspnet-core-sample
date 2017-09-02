import { JsonServiceClient } from "servicestack-client";

const baseUrl = document.getElementsByTagName('base')[0].href || '/'
export var client = new JsonServiceClient(baseUrl);
