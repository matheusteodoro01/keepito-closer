import jwt_decode from "jwt-decode";

export function decoder(acesstoken) {
  return jwt_decode(acesstoken);
}
