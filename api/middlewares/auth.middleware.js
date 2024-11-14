import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const authMiddleware = (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const authHeader = req.header('Authorization');
    
    // Check if the authorization header exists
    if (!authHeader) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Check if the token is prefixed with 'Bearer'
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    
    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export { authMiddleware };
