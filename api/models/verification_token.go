package models

import (
	"time"
)

// VerificationToken represents the verification token schema in the database
type VerificationToken struct {
	ID         string    `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"` // Primary key
	Identifier string    `gorm:"type:text;not null"`                              // Identifier for the token
	Token      string    `gorm:"type:text;not null"`                              // Unique token
	Expires    time.Time `gorm:"not null"`                                        // Expiration timestamp

	// Composite unique constraint for identifier and token
	IdentifierTokenConstraint string `gorm:"uniqueIndex:unique_identifier_token"`
}