# Grammar Teacher Learning Management System

## Overview

This is a comprehensive grammar education platform built as a full-stack web application. The system serves as a learning management system specifically designed for grammar instruction, featuring interactive quizzes, lesson booking, resource management, and student progress tracking. The platform supports both student and teacher roles, with teachers able to create content and manage lessons while students can take quizzes, book lessons, and track their progress.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript, following a component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed using shadcn/ui components built on top of Radix UI primitives, ensuring accessibility and consistent design patterns. TanStack Query handles client-side state management and server synchronization, providing caching and optimistic updates. The routing is managed by Wouter, a lightweight client-side router.

### Backend Architecture
The server follows a REST API architecture built with Express.js and TypeScript. The application uses a layered architecture with clear separation between routes, business logic, and data access layers. Authentication is implemented using JSON Web Tokens (JWT) with bcrypt for password hashing. The server includes middleware for request logging, error handling, and authentication verification.

### Data Layer
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations and migrations. The database schema supports user management, quiz systems, lesson scheduling, resource management, forum posts, and contact messages. The schema is designed with proper foreign key relationships and includes support for JSONB fields for flexible data storage (quiz questions and answers).

### Component Design System
The UI implements a comprehensive design system using Tailwind CSS with CSS custom properties for theme management. The system supports both light and dark themes with consistent color tokens and typography scales. Components are built using the compound component pattern with proper accessibility features including ARIA labels, keyboard navigation, and screen reader support.

### Authentication & Authorization
User authentication is handled through a centralized auth system that manages JWT tokens and user sessions. The system supports role-based access control with distinct permissions for students and teachers. Authentication state is managed through a custom hook that provides login, logout, and user context throughout the application.

### State Management
The application uses TanStack Query for server state management, providing automatic caching, background updates, and error handling. Local UI state is managed through React hooks and context where appropriate. The auth system maintains global user state through a custom AuthManager class that handles token persistence in localStorage.

## External Dependencies

### Database & ORM
- PostgreSQL database for data persistence
- Drizzle ORM for type-safe database operations and schema management
- Neon Database serverless driver for PostgreSQL connections

### UI & Styling
- Radix UI primitives for accessible component foundations
- Tailwind CSS for utility-first styling approach
- Lucide React for consistent iconography
- React Hook Form with Zod for form validation and type safety

### Development & Build Tools
- Vite for development server and build optimization
- TypeScript for type safety and developer experience
- ESBuild for fast production builds
- Replit integration for development environment

### Authentication & Security
- bcryptjs for password hashing
- jsonwebtoken for JWT token generation and verification
- Zod for runtime type validation and schema enforcement

### Client-side Libraries
- TanStack React Query for server state management and caching
- Wouter for lightweight client-side routing
- React Day Picker for date selection components
- Class Variance Authority (CVA) for component variant management

The architecture prioritizes type safety, accessibility, and maintainability while providing a scalable foundation for a comprehensive learning management system. The separation of concerns between frontend and backend allows for independent development and deployment strategies.