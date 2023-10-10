import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'sy-platpus_token';

const getEmail = (token) => {
    
    if (!token) return null; 

    try {
        const decodedToken = jwtDecode(token);
        //console.log(decodedToken)
        return decodedToken.email;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export {getEmail};