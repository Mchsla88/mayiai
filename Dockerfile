
FROM node:18-alpine

# Install System Dependencies (FFmpeg, Python for yt-dlp)
RUN apk add --no-cache ffmpeg python3 py3-pip curl

# Install yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# Install Node Dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy Source
COPY . .

# Build Next.js
RUN npm run build

# Expose Port
EXPOSE 3000

# Start
CMD ["npm", "start"]
