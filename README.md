# TrackIt

TrackIt is a full-stack job application tracking dashboard that helps users organize and manage their job search process. Users can add applications, track progress through different stages, update application details, and monitor their overall job search performance through a clean dashboard interface.


## Features

* Create, edit, and delete job applications
* Track application status:

  * Applied
  * Interview
  * Offer
  * Rejected
* Search applications by company name
* Filter applications by status
* Sort applications by date or company
* Dashboard statistics and insights
* Offer success rate tracking
* Responsive and modern user interface
* PostgreSQL database integration

## Tech Stack

### Frontend

* Next.js 14
* React
* TypeScript

### Backend

* Next.js Server Actions
* Drizzle ORM

### Database

* PostgreSQL
* Neon (Production Database)

### Development & Deployment

* Docker (Local PostgreSQL Development)
* Vercel (Hosting & Deployment)
* GitHub (Version Control)

## Architecture

```text
Browser
   ↓
Next.js Application
   ↓
Server Actions
   ↓
Drizzle ORM
   ↓
PostgreSQL Database (Neon)
```


## Local Development

### Clone the repository

```bash
git clone https://github.com/shubhang1603/trackit.git
cd trackit
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
DB_URL=your_postgresql_connection_string
```

### Run the application

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

## Database Setup

### Using Docker

```bash
docker compose up -d
```

### Push schema

```bash
npx drizzle-kit push:pg
```

## Deployment

The application is deployed on Vercel and uses Neon PostgreSQL as the production database.

## Future Improvements

* User Authentication
* User-specific job tracking
* Resume management
* Application links
* Notes attachments
* Email reminders
* Analytics dashboard
* Mobile optimization

## What I Learned

Building TrackIt helped me gain hands-on experience with:

* Full-stack development using Next.js
* PostgreSQL database design
* Drizzle ORM and schema management
* Docker containers
* Server Actions
* CRUD operations
* State management in React
* Deploying production applications with Vercel
* Cloud databases with Neon

## License

This project is licensed under the MIT License.
