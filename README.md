
# Vidflow

VidFlow is an innovative video streaming platform that allows users to upload, stream, and manage video content seamlessly. Built with Angular for a responsive, engaging interface and Java Spring Boot for a robust backend, it leverages AWS to deliver reliable viewing experience.

## Features

- **✅User-Friendly Interface:**
    Intuitive UI built with Angular ensures a seamless viewing and interaction experience across devices.

- ✅**Robust Backend:**
    Powered by Java Spring Boot, the backend handles video processing, user management, and API integrations efficiently.
- **✅Cloud Scalability:**
    Deployed on AWS to ensure high availability, scalability, and secure data storage.
- **✅Secure Access:**
    Incorporates authentication and role-based authorization for secure access to video content and administrative features.

## Tech Stack
**Client:**
Angular, HTML, CSS, JavaScript

**Server:**
Java, Spring Boot, RESTful APIs

**Cloud & Deployment:**
AWS (EC2, S3 bucket, CloudFront)

**Database:**
MongoDB

**Other Tools:**
Git, Maven, Docker



## Prerequisites
- Node.js & npm: For running the Angular application.
- Java JDK (11 or above): For building and running the backend.
- Maven: For dependency management and building the Spring Boot project.
- AWS Account: For deployment (if deploying to the cloud).
## Deployment
## AWS Deployment
**1. Configure AWS Credentials:**
Set up your AWS CLI with proper credentials.

**2. Deploy the Backend:**
- Package your Spring Boot application.
- Deploy on an AWS EC2 instance or use AWS Elastic Beanstalk.

**3. Deploy the Frontend:**
- Build the Angular application with ng build --prod.
- Upload the build output to an AWS S3 bucket.
- Configure AWS CloudFront to serve the content for better performance.
**4. Update Environment Variables:**
- Ensure all endpoints and configuration variables are updated to reflect production settings.