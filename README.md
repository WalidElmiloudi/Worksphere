WorkSphere — Interactive Workforce Floor Management App

WorkSphere is a modern, interactive web application designed to help organizations visually manage, assign, and organize employees on a real-time floor plan.
The application focuses on ease of use, role-based restrictions, and dynamic UI interactions to deliver a fluid, responsive experience.

🌟 Project Overview

WorkSphere allows managers and staff coordinators to:

Add, edit, and remove employees.

Drag & drop workers onto specific rooms/zones.

Apply business rules to ensure staff are placed only where allowed.

View detailed employee profiles.

Manage all data within a single, intuitive dashboard.

🎯 Main Features
✅ Employee Management

Add workers through a modal form (Name, Role, Photo URL, Email, Phone).

Add multiple professional experiences dynamically.

Regex validation (email/phone/name).

Automatic image preview.

Remove employee from a zone (“X” button) → back to Unassigned.

✅ Smart Floor Plan (6 Areas)

Conference Room

Reception

Server Room

Security Room

Staff Room

Archive Room

🔐 Role Restrictions
Reception :	Receptionist only
Server Room :	IT Technician only
Security Room :	Security Agent only
Manager	Access : everywhere
Cleaning :	Everywhere except Archives
Others :	Free access except restricted rooms
🧠 Dynamic Assignments

Each zone has a “+” button → choose an eligible employee.

Zones with mandatory staff show light red when empty (except Conference Room & Staff Room).

Max-capacity limits per zone.

💻 Front-End Architecture

Full HTML structure including sidebar (Unassigned Staff) & Add Worker button.

Responsive layout using Flexbox + CSS Grid.

Modern UI with rounded shapes and colorful buttons (green, orange, red).

📱 Responsive Design

Desktop + Mobile versions.

Optimized layouts for tablets & phones.

Clean zoning for mobile display.

🚀 Tech Stack

HTML5

CSS3 Framework : tailwind (Flexbox, Grid, Animations)

JavaScript (ES6+)

LocalStorage (optional for saved layout)

Trello for agile management

🧪 Validation

HTML validated using W3C Validator

CSS validated using W3C CSS Validator

Form inputs validated using REGEX

🧬 Project Management (Scrum)

User Stories categorized in Trello

Clear workflow: To-Do → Doing → Done

🌍 Deployment

https://walidelmiloudi.github.io/Worksphere/