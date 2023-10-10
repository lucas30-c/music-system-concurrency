import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'sy-platpus_token';

const getUsername = (token) => {
    
    if (!token) return null; 

    try {
        const decodedToken = jwtDecode(token);
        //console.log(decodedToken)
        return decodedToken.username;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export {getUsername};