package models

import (
	"time"
)

// Session represents the session schema in the database
type Session struct {
	SessionToken string    `gorm:"primaryKey;type:text"`      // Unique session token
	UserID       string    `gorm:"not null"`                 // Foreign key to the User table
	Expires      time.Time `gorm:"not null"`                 // Expiration timestamp
	CreatedAt    time.Time `gorm:"autoCreateTime"`           // Auto-generated creation timestamp
	UpdatedAt    time.Time `gorm:"autoUpdateTime"`           // Auto-updated modification timestamp
	User         User      `gorm:"constraint:OnDelete:CASCADE"` // Belongs to User
}