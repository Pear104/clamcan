import { sAuth } from "app/stores/authStore";
import { getCookie, setCookie } from "./cookie";
import { isTokenExpired } from "./jwtUtils";

const SendRequest = async (
  method,
  url,
  body = {},
  privateEndpoint = true,
  isFile = false
) => {
  const header = {
    Accept: "application/json, text/plain",
    Authorization: `Bearer ${getCookie("accessToken")}`,
    cid: process.env.REACT_APP_CID,
  };

  if (!isFile) {
    header["Content-Type"] = "application/json;charset=UTF-8";
  }

  const data = await fetch(process.env.REACT_APP_SERVER_URL + url, {
    method: method,
    headers: header,
    body: isFile ? body : method === "GET" ? null : JSON.stringify(body),
  });
  const json = await data.json();

  if (
    privateEndpoint &&
    (getCookie("accessToken") === "" || isTokenExpired())
  ) {
    sAuth.set((pre) => (pre.value = {}));
    alert("Session expired, please login again");
    setCookie("accessToken", "", 0);
  }

  // returned array json
  if (json instanceof Array) {
    return {
      data: [...json],
      status: data.status,
    };
  }
  // returned message json
  return {
    data: json,
    status: data.status,
  };
};

export const GET = async (url, privateEndpoint = true) =>
  await SendRequest("GET", url, {}, privateEndpoint);
export const POST = async (url, body, isFile = false, privateEndpoint = true) =>
  await SendRequest("POST", url, body, privateEndpoint, isFile);
export const PUT = async (url, body, privateEndpoint = true) =>
  await SendRequest("PUT", url, body, privateEndpoint);
export const PATCH = async (url, body, privateEndpoint = true) =>
  await SendRequest("PATCH", url, body, privateEndpoint);
export const DELETE = async (url, body, privateEndpoint = true) =>
  await SendRequest("DELETE", url, body, privateEndpoint);
