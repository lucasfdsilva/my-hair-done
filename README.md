![Logo](https://myhairdone-portfolioimages.s3-eu-west-1.amazonaws.com/Header+Logo+1200px.png)

# My Hair Done - Style or Get Styled
My Hair Done is a Web application that aims to streamline the process of getting a haircut for both independent professionals and customers. <br>

For Professionals, the application is a platform to manage their bookings and availability and to publish their portfolio and style characteristics so that customers looking for a professional specialised in a given style or location can find a match easily. <br> 

For customers, the app helps them on 3 different fronts: 1st The AI Hairstyle builder helps users to try different haircut styles & 2nd, the app helps them find professionals that match their hairstyle choice and finally, schedule appointments with any professional in the platform through the app. <br> 

My Hair Done was built as a Cloud Native application with backend & Frontend decoupled to allow for a mobile app expansion in the future. The backend was built in NodeJS using the REST architecture while the Frontend was built using ReactJS and it communicates with the backend as an API using HTTP Calls. <br> 

To streamline the development process and publishing of iterative updates, a full CI/CD pipeline was implemented using GitHub and AWS Development Services (CodeDeploy/CodePipeline).  The application infrastructure is also hosted in AWS using managed services where possible to streamline the application development and reduce operations cost. Both Backend and Frontend are hosted in an auto-scaling group of EC2 instances with load-balancers. The backend connects to a MySQL database hosted in AWS RDS. The application also leverages AWS SES for mailing tasks and AWS SQS where queueing between services is necessary. Other AWS services such as Route53 (DNS), Certificate manager (HTTPS) are also being used.  

<h2>Technologies Used:</h2>
<ul>
 <li>NodeJS - Used to build the application's backend which was built as a REST API to serve multiple front ends.</li>
 <li>ReactJS - Used to build the web application.</li>
 <li>Swagger - Used to document the backend API endpoints and models.</li>
 <li>AWS EC2 - Hosting Backend Auto-Scalation Instances Group.</li>
 <li>AWS CloudFront - Serving the static frontend files.</li>
 <li>AWS S3 - Hosting all application supporting files.</li>
 <li>AWS Lambda - Running the serverless microservices (email verification, booking confirmation, etc).</li>
 <li>AWS RDS - Hosting the main MySQL database.</li>
 <li>AWS SES (Simple Email Service) - Mailing service used by the application.</li>
 <li>AWS SQS (Simple Queue Service) - Queueing system to organize requests made to backend/microservices.</li>
 <li>AWS Route53 - DNS Service.</li>
 <li>AWS Certificate Manager - Providing Https certificates to the application.</li>
 <li>AWS Secrets Manager - Storing secrets to all components needed and only serving these secrets to the backend at runtime.</li>
 <li>AWS CodeBuild / CodeDeploy / CodePipeline - Implementing a fully automated CI/CD pipeling to streamline the development process.</li>
</ul>

<h2>Web App Available at:</h2>
https://myhairdone.co.uk</br>

<h2>Backend API Available at:</h2>
https://api.myhairdone.co.uk</br>

<h2>Running this application locally</h2>
<h3>Run Backend Locally:</h3>
<code>cd backend</code></br>
<code>npm install</code></br>
<code>npm run start</code></br>
<code>Application will listen to Port 3000 if no System Env is configured.</code></br>

<h3>Run Web App Locally:</h3>
<code>cd web</code></br>
<code>npm install</code></br>
<code>npm run start</code></br>
<code>Application will listen to Port 3000 if no System Env is configured.</code></br>
