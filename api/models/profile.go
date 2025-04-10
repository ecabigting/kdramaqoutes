package models

// Profile represents a user profile in the database
type Profile struct {
	ID            string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"` // Primary key
	ISS           string `gorm:"index" json:"iss"`                                // Issuer of the token
	AZP           string `json:"azp"`                                             // Authorized party
	AUD           string `gorm:"index" json:"aud"`                                // Audience for the token
	SUB           string `gorm:"uniqueIndex" json:"sub"`                          // Subject (unique identifier for the profile)
	AtHash        string `json:"at_hash,omitempty"`                               // Access token hash, omitted if empty
	IAT           int64  `json:"iat"`                                             // Issued-at timestamp
	EXP           int64  `json:"exp"`                                             // Expiration timestamp
	Email         string `gorm:"index" json:"email"`                              // User's email address
	EmailVerified bool   `json:"email_verified"`                                  // Whether the email is verified
	Name          string `json:"name"`                                            // User's full name
	Picture       string `json:"picture"`                                         // URL to the user's profile picture
	GivenName     string `json:"given_name"`                                      // User's given (first) name
	FamilyName    string `json:"family_name"`                                     // User's family (last) name
}
