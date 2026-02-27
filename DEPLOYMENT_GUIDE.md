# Eduspace - Production Deployment Guide

## Deployment Checklist

Before deploying to production, ensure you've completed all of these:

- [ ] All security variables set in .env (JWT_SECRET, MONGODB_URI, etc)
- [ ] Node environment set to `production`
- [ ] Database backups configured
- [ ] SSL/TLS certificates obtained
- [ ] Rate limiting configured appropriately
- [ ] CORS origins updated for production domains
- [ ] Logging configured for monitoring
- [ ] Error tracking service integrated (Sentry, etc)
- [ ] Database indexes created
- [ ] Load balancer configured (if needed)
- [ ] CDN configured for static assets
- [ ] Monitoring and alerts set up

---

## Deployment Options

### Option 1: Docker & Docker Compose (Recommended)

#### Step 1: Build Docker Images

```bash
cd backend
docker build -t eduspace-backend:latest .
cd ../eduspace-react
docker build -t eduspace-frontend:latest .
```

#### Step 2: Create Production docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: eduspace-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
      MONGO_INITDB_DATABASE: eduspace
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
    networks:
      - eduspace-network
    restart: unless-stopped

  backend:
    image: eduspace-backend:latest
    container_name: eduspace-api
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      PORT: 5000
      MONGODB_URI: mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb:27017/eduspace
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGIN: ${CORS_ORIGIN}
      LOG_LEVEL: info
    depends_on:
      - mongodb
    networks:
      - eduspace-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: eduspace-frontend:latest
    container_name: eduspace-ui
    ports:
      - "3000:80"
    environment:
      VITE_API_URL: ${API_URL}
    networks:
      - eduspace-network
    restart: unless-stopped
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    container_name: eduspace-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - eduspace-network
    restart: unless-stopped

volumes:
  mongodb_data:
  mongodb_config:

networks:
  eduspace-network:
    driver: bridge
```

#### Step 3: Create .env.production

```bash
# Database
MONGO_USER=admin
MONGO_PASSWORD=secure_password_here
MONGODB_URI=mongodb://admin:secure_password_here@mongodb:27017/eduspace

# API
NODE_ENV=production
PORT=5000
JWT_SECRET=very_secure_jwt_secret_minimum_32_characters_long_change_this

# CORS
CORS_ORIGIN=https://yourdomain.com

# API
API_URL=https://api.yourdomain.com/api/v1
VITE_API_URL=https://api.yourdomain.com/api/v1
```

#### Step 4: Create nginx.conf

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 5M;

    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss;

    upstream api_backend {
        server backend:5000;
    }

    upstream frontend_app {
        server frontend:3000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name _;
        return 301 https://$host$request_uri;
    }

    # Frontend
    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            proxy_pass http://frontend_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # API
    server {
        listen 443 ssl http2;
        server_name api.yourdomain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
    }
}
```

#### Step 5: Deploy with Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

---

### Option 2: AWS Deployment (Elastic Beanstalk + RDS)

#### Prerequisites
- AWS account
- AWS CLI configured
- EB CLI installed

#### Step 1: Create Backend Elastic Beanstalk App

```bash
cd backend

# Initialize EB
eb init -p node.js-16 eduspace-api --region us-east-1

# Create environment
eb create production

# Set environment variables
eb setenv \
  NODE_ENV=production \
  PORT=5000 \
  MONGODB_URI=$MONGODB_URI \
  JWT_SECRET=$JWT_SECRET \
  CORS_ORIGIN=https://yourdomain.com
```

#### Step 2: Create RDS MongoDB Instance

```bash
# Use AWS Console to create MongoDB Atlas or DocumentDB
# Update MONGODB_URI in EB environment
```

#### Step 3: Deploy Frontend to CloudFront + S3

```bash
cd eduspace-react

# Build
npm run build

# Create S3 bucket
aws s3 mb s3://eduspace-frontend-prod

# Upload files
aws s3 sync dist/ s3://eduspace-frontend-prod/

# Create CloudFront distribution in AWS Console
```

---

### Option 3: Heroku Deployment

#### Backend

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create eduspace-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$JWT_SECRET
heroku config:set MONGODB_URI=$MONGODB_URI
heroku config:set CORS_ORIGIN=https://yourdomain.com

# Deploy
git push heroku main
```

#### Frontend

```bash
cd eduspace-react

# Create buildpack
npm i -g heroku-cli

# Create app
heroku create eduspace

# Configure API URL
heroku config:set VITE_API_URL=https://eduspace-api.herokuapp.com/api/v1

# Deploy
git push heroku main
```

---

### Option 4: DigitalOcean App Platform

#### Step 1: Create app.yaml

```yaml
name: eduspace
services:
  - name: api
    github:
      repo: yourusername/eduspace
      branch: main
    build_command: cd backend && npm install && npm run build
    run_command: cd backend && npm run start
    environment_slug: node-js
    envs:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        value: ${JWT_SECRET}
      - key: MONGODB_URI
        value: ${MONGODB_URI}
    http_port: 5000

  - name: web
    github:
      repo: yourusername/eduspace
      branch: main
    build_command: cd eduspace-react && npm install && npm run build
    source_dir: eduspace-react/dist
    http_port: 8080

databases:
  - name: mongodb
    engine: MONGODB
    version: "6.0"
```

#### Step 2: Deploy

```bash
doctl apps create --spec app.yaml
```

---

## Database Management

### MongoDB Backup

```bash
# Local backup
mongodump --uri "mongodb://user:pass@host:27017/eduspace" --out ./backup

# Restore
mongorestore --uri "mongodb://user:pass@host:27017/eduspace" ./backup

# Use MongoDB Atlas for cloud backups
```

### Database Indexes

Ensure these indexes are created for performance:

```javascript
// In backend startup or use MongoDB Compass
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ registrationId: 1 }, { unique: true });
db.testpapers.createIndex({ course: 1 });
db.results.createIndex({ studentId: 1 });
db.results.createIndex({ testPaperId: 1 });
db.activities.createIndex({ userId: 1 });
db.activities.createIndex({ timestamp: -1 });
```

---

## SSL/TLS Certificates

### Using Let's Encrypt with Nginx

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run

# Set cron job for auto-renewal
0 2 * * * /usr/bin/certbot renew --quiet
```

---

## Monitoring & Logging

### CloudWatch Integration (AWS)

```javascript
// In backend
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

// Log metrics
cloudwatch.putMetricData({
    Namespace: 'Eduspace',
    MetricData: [{
        MetricName: 'RequestCount',
        Value: 1,
        Timestamp: new Date()
    }]
}, callback);
```

### Sentry Integration (Error Tracking)

```bash
npm install @sentry/node @sentry/tracing
```

```javascript
// In server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### New Relic Integration

```bash
npm install newrelic
```

Add to beginning of server.js:
```javascript
require('newrelic');
```

---

## Performance Optimization

### Database Query Optimization

```javascript
// Use lean() for read-only queries
db.users.find().lean().exec();

// Use select() to limit fields
db.users.find().select('name email').exec();

// Use pagination
db.users.find().limit(10).skip(offset).exec();
```

### Caching Strategy

```javascript
// Use Redis for session/cache
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
router.get('/courses', async (req, res) => {
    const cached = await client.get('courses');
    if (cached) return res.json(JSON.parse(cached));
    
    const courses = await Course.find();
    await client.setex('courses', 3600, JSON.stringify(courses));
    res.json(courses);
});
```

### CDN Configuration

```nginx
# In nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

---

## Security Hardening

### HTTPS Enforcement

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline';" always;
```

### DDoS Protection

- Use Cloudflare or AWS Shield
- Implement rate limiting
- Configure WAF rules

---

## Monitoring & Alerts

### Key Metrics to Monitor

1. API Response Time
2. Error Rate
3. Database Query Performance
4. Memory Usage
5. CPU Usage
6. Request Count
7. Active Users

### Alert Thresholds

```
- Error Rate > 5%
- Response Time > 2 seconds
- Memory Usage > 80%
- Database Down > 5 minutes
- Disk Space < 10%
```

---

## Rollback Procedure

```bash
# If deployment fails
docker-compose down
docker image rm eduspace-backend:latest
docker pull eduspace-backend:previous
docker-compose up -d

# Or with git
git revert HEAD
git push

# EB rollback
eb abort
eb status
```

---

## Post-Deployment Verification

```bash
# Check API health
curl https://api.yourdomain.com/health

# Verify database connection
curl -H "Authorization: Bearer ${TOKEN}" \
     https://api.yourdomain.com/admin/dashboard-stats

# Check frontend loads
curl -H "User-Agent: Mozilla/5.0" \
     https://yourdomain.com
```

---

## Cost Optimization

1. **Use spot instances** (70% cheaper)
2. **Auto-scaling** based on metrics
3. **Reserved instances** for baseline traffic
4. **Database optimization** (remove unused indexes)
5. **CDN caching** (reduce origin requests)
6. **Log aggregation** (don't store locally)

---

## Troubleshooting

### Container Won't Start

```bash
docker logs container_name
docker inspect container_name
```

### High Memory Usage

```bash
# Check Node process memory
ps aux | grep node

# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

### Database Connection Issues

```bash
# Test connection
mongosh "mongodb://user:pass@host:27017/eduspace"

# Check connection pool
db.currentOp()
```

---

**Last Updated**: 2024  
**Status**: Production Ready ✅  
**Support**: For issues, contact your deployment provider support
