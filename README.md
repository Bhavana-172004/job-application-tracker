# Job Application Tracker

A full stack web app to track job applications: add, edit, delete and filter them by status.

![Screenshot](docs/screenshot.png)

## Features
- Add, view, edit and delete job applications
- Filter applications by status (Applied, Interview, Offer, Rejected)
- Input validation with clear error messages
- Global exception handling in the REST API

## Tech Stack
- Java 21, Spring Boot 4
- Spring Data JPA, Hibernate, Bean Validation
- H2 database (local), PostgreSQL (deployment)
- HTML, CSS, JavaScript (served from Spring Boot)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/applications | List all (optional `?status=INTERVIEW`) |
| GET | /api/applications/{id} | Get one application |
| POST | /api/applications | Create an application |
| PUT | /api/applications/{id} | Update an application |
| DELETE | /api/applications/{id} | Delete an application |

## Run Locally
1. Clone the repo: `git clone https://github.com/Bhavana-172004/job-application-tracker.git`
2. Open the folder and run `mvnw spring-boot:run`
3. Open http://localhost:8082

## Live Demo
Coming soon.

## Future Improvements
- JWT login so each user sees only their applications
- Pagination and search
- Unit and integration tests

## Author
Bhavana S, 2026 CSE graduate. Java full stack developer.