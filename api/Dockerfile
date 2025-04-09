# Use the official Go image with Alpine for a small and secure base image
FROM golang:1.24-alpine

# Install necessary packages
RUN apk add --no-cache git curl

# Install air for live reloading
 RUN go install github.com/air-verse/air@latest

# Set environment variables for Go
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Set the working directory in the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run air for live reloading
CMD ["air", "-c", ".air.toml"]
