import jwtDecode from 'jwt-decode';

const getRole = (token) => {
    
    if (!token) return null; 

    try {
        const decodedToken = jwtDecode(token);
        //console.log(decodedToken)
        return decodedToken.role;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export {getRole};