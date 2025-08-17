# Grammar Master - Learning Management System

A comprehensive grammar education platform built as a full-stack web application. The system serves as a learning management system specifically designed for grammar instruction, featuring interactive quizzes, lesson booking, resource management, and student progress tracking.

## 🚀 Features

### Core Features
- **User Authentication**: Secure login/register with JWT tokens and role-based access (students/teachers)
- **Interactive Quizzes**: Timed grammar quizzes with immediate feedback and progress tracking
- **Lesson Booking**: Calendar-based lesson scheduling with different lesson types
- **Progress Analytics**: Comprehensive dashboard with statistics and learning insights
- **Resource Library**: Access to grammar guides, videos, worksheets, and practice materials
- **Discussion Forum**: Community space for students to ask questions and share knowledge
- **Dark/Light Theme**: Modern UI with theme switching support

### Technical Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Updates**: Live notifications and progress tracking
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Modern Architecture**: Component-based React with clean API design

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **shadcn/ui** components built on Radix UI
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Drizzle ORM** for database operations

### Database
- **PostgreSQL** with Drizzle schema
- **Neon Database** serverless driver

### Development Tools
- **Vite** for fast development and building
- **ESLint** and **Prettier** for code quality
- **Replit** for development environment

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utility functions and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data layer with in-memory storage
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and validation
└── components.json       # shadcn/ui configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd grammar-master-lms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

### Default Accounts

The application comes with a seeded teacher account:
- **Email**: teacher@grammarmaster.com
- **Password**: password
- **Role**: Teacher

Students can register through the application interface.

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Usage

### For Students
1. **Register** for a new account or **login** with existing credentials
2. **Take Quizzes** to test your grammar knowledge
3. **Book Lessons** with available teachers
4. **Track Progress** through the comprehensive dashboard
5. **Access Resources** including guides, videos, and practice materials
6. **Participate in Forums** to ask questions and help others

### For Teachers
1. **Login** with teacher credentials
2. **Create and Manage** quizzes and learning materials
3. **Schedule Lessons** with students
4. **Monitor Student Progress** through analytics
5. **Manage Resources** and course content

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=development
JWT_SECRET=your-secret-key-here
DATABASE_URL=your-database-connection-string
```

### Database Setup
The application uses Drizzle ORM with PostgreSQL. The schema is defined in `shared/schema.ts` and includes:
- Users (students and teachers)
- Quizzes with questions and answers
- Lesson bookings and scheduling
- Learning resources and materials
- Forum posts and discussions
- Contact messages and inquiries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and open-source libraries
- UI components from shadcn/ui and Radix UI
- Icons from Lucide React
- Inspired by modern learning management systems

## 📞 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Grammar Master** - Empowering language learners with comprehensive grammar education tools.