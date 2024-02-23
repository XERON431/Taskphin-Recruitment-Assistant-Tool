# Recruitment Assistance Tool

Recruitment Assistance is an all-purpose recruitment solution designed to streamline the hiring process for both job seekers and recruiters. It offers a comprehensive platform for managing candidates, evaluating their skills, and tracking their progress through different stages of recruitment.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Future Scope](#future-scope)


## Features

- **Global Candidate Showcase**: Job seekers can create profiles to showcase their skills and qualifications, increasing their visibility to recruiters from various organizations worldwide. Candidates can put up their profiles without logging in.

- **Dedicated Register and Login Panel for Recruiters**: Recruiters have a dedicated register and login panel to access the platform, allowing for secure management of candidate applications.

- **Searchable Global Candidate Showcase**: The global candidate showcase displays all verified candidates available for hiring. It features a search box that returns candidates matching the search text most appropriately. Recruiters can save candidates for further tracking and updating.

- **Candidate Information Management**: Recruiters can update each candidate's information, including application status, directly from the platform. 

- **Recruiter Dashboard**: Each recruiter has a dedicated dashboard where saved candidates are presented, allowing them to track candidates and manage their applications efficiently.

- **Candidate Management Dashboard**: Recruiters have access to a candidate management dashboard, where they can view and manage candidates' applications they've created.

- **Candidate Lifecycle Management**: The tool facilitates managing candidates through different stages of recruitment, including:
  - Listed
  - Contacted
  - Interview Scheduled
  - Offer Extended
  - Hired
  - Rejected

- **Candidate Information**: Each candidate's profile includes the following details:
  - Candidate name
  - Contact information (email, phone)
  - Skills/Qualifications
  - Current status
  - Additional Attribute: Expected Salary (numeric value)

## Usage

### For Job Seekers

1. Create a profile with detailed information about your skills and qualifications.
2. Update your profile regularly to showcase your latest achievements and experiences.
3. Monitor your profile's visibility and engagement with recruiters.
4. Stay informed about new opportunities and respond promptly to recruiters' inquiries.

### For Recruiters

1. Log in to the Recruitment Assistance tool with your credentials.
2. Browse through candidate profiles to identify potential matches for your job openings.
3. Manage candidates' information and track their progress through different recruitment stages.
4. Communicate with candidates, schedule interviews, and extend job offers directly through the platform.
5. Utilize advanced filtering and search functionalities to find candidates with specific skills or qualifications.


## Installation

### Install Dependencies
- cd recruitment-assistance/client
- npm install
- cd ../server
- npm install
  
### Create .env File in server
PORT, JWT_SECRET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_API_VERSION, EMAIL_FROM, DB_CONNECTION_URL

### Start the Program
#### Running Client Side
- cd ../client
- npm run dev

#### Running Server Side
- cd ../server
- npm start

### Database Setup
You can use a PostgreSQL database provided by render.com. Set up your database and replace the DB_CONNECTION_URL in the .env file with your database connection URL.

## Architecture
### Registration and Login 
- Start by registering and logging in with email and password in the application to access the full features.
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/60e5f6e8-5b09-46b1-ac1c-7c79fb70fe9f)

### Candidate Registration 
- Candidates can create their profiles without logging in
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/32ac7cf3-f77b-4b6b-b34c-e0d855d89bd2)

### Global Candidate Showcase
- Showcases all the publsihed candidates with their score and hiring status with basic description
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/9a9bacb0-9e28-4fc9-96e8-9aaf4d771b40)

### Open Candidate Management
- Newly registered open candidates are shown here which are then judged and published to global candidate showcase by the recruiters.
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/e8c97cb2-97eb-4cd2-b133-f5230327c436)

### Candidate Management
- Showcases the candidates created by the logged in recruiter
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/90206134-0f26-48d4-9de2-b6fea5d69417)

### Add Candidates
- Loggedin recruiter can create new candidate profiles from here
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/f3c4258d-efb8-4976-83a1-72f5f8666639)

### Saved Candidates
- Recruiters can track the status of their saved candidates from this page
  
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/35dd583a-257a-4f7b-8364-93ec2a7d9864)

### CRUD Operations
#### Publishing/Unpublishing Candidates to Global Showcase page
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/e1078e54-ee3a-495e-aa9b-1260c9d94029)

#### Updating Candidates Information and Hiring status
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/9a38d0a0-7ff7-4d8a-908d-285d965a1d9a)

#### Saving Candidates to for future tracking
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/a2aa757a-729c-4cb5-bddf-b6121a5758ac)

#### Deleting Candidates
![image](https://github.com/XERON431/Taskphin-Recruitment-Assistance-Tool/assets/103522839/5374819a-e907-4034-9c5c-710a5badc773)

## Technologies
### Frontend
- Next.js
- React
### Backend
- Node.js
- Express.js
### Database
- PostgresSQL - render.com
- AWS-S3

## Future Scope
- creating separate role based access and authorization for candidates and recruiters
- creating further criterias and grading points to categorise candidates
- faster search agorithm for search box in global showcase












