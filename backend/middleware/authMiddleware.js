import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const isAdmin = (req, res, next) => {
  // Check if the user is authenticated and has the admin role in metadata
  // Note: req.auth is populated by ClerkExpressWithAuth or ClerkExpressRequireAuth
  if (req.auth && req.auth.sessionClaims && req.auth.sessionClaims.metadata && req.auth.sessionClaims.metadata.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
