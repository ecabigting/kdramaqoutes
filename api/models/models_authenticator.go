package models

// Authenticator represents the authenticator schema in the database
type Authenticator struct {
	CredentialID         string `gorm:"primaryKey;type:text"`                     // Unique credential ID
	UserID               string `gorm:"not null"`                                // Foreign key to the User table
	ProviderAccountID    string `gorm:"type:text;not null"`                      // Provider account ID
	CredentialPublicKey  string `gorm:"type:text;not null"`                      // Public key for the credential
	Counter              int    `gorm:"not null"`                                // Counter for the credential
	CredentialDeviceType string `gorm:"type:text;not null"`                      // Device type for the credential
	CredentialBackedUp   bool   `gorm:"default:false"`                           // Whether the credential is backed up
	Transports           *string `gorm:"type:text"`                              // Transport methods (e.g., USB, NFC)
	User                 User   `gorm:"constraint:OnDelete:CASCADE"`             // Belongs to User
}