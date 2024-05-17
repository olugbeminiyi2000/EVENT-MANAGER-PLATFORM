import CryptoJS from "crypto-js";

export const gravatar = (email, size=200) => {
    // hash the email using MD5 algorithm
    const hash = CryptoJS.MD5(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);

    // construct Gravatar URL
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

    return gravatarUrl;
}