package middleware

import (
	"context"  // For handling context
	"net/http" // For HTTP status codes and responses
	"strings"  // For string manipulation

	"github.com/gin-gonic/gin"      // Gin framework for middleware and routing
	"google.golang.org/api/idtoken" // Google library for verifying ID tokens
)

// AuthMiddleware validates Google ID Tokens (if provided) and ensures requests are authenticated
func AuthMiddleware(googleClientID string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Step 1: Extract the Authorization header
		authHeader := c.GetHeader("Authorization")

		// If no Authorization header is present, skip Google ID Token validation
		// if authHeader == "" {
		// 	c.Next() // Allow the request to proceed; other authentication mechanisms may handle it
		// 	return
		// }

		// Step 2: Validate the Authorization header format (must start with "Bearer ")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid authorization header format"})
			c.Abort() // Abort the request with a 401 Unauthorized response
			return
		}

		// Step 3: Extract the ID token from the Authorization header
		idToken := strings.TrimPrefix(authHeader, "Bearer ")

		// Step 4: Verify the ID token using Google's public keys
		payload, err := idtoken.Validate(context.Background(), idToken, googleClientID)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid Google ID token", "details": err.Error()})
			c.Abort() // Abort the request with a 401 Unauthorized response
			return
		}

		// Step 5: Validate the token issuer to ensure it is from Google
		if payload.Issuer != "https://accounts.google.com" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid token issuer"})
			c.Abort() // Abort the request with a 401 Unauthorized response
			return
		}

		// Step 6: Store the token payload in the Gin context for use in downstream handlers
		c.Set("googlePayload", payload)

		// Step 7: Proceed to the next middleware or handler
		c.Next()
	}
}
