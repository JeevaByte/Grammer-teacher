import { 
  type User, 
  type InsertUser, 
  type Quiz, 
  type InsertQuiz,
  type QuizResult,
  type InsertQuizResult,
  type Lesson,
  type InsertLesson,
  type Resource,
  type InsertResource,
  type ForumPost,
  type InsertForumPost,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz operations
  getQuizzes(): Promise<Quiz[]>;
  getQuiz(id: string): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Quiz result operations
  getQuizResults(userId: string): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  
  // Lesson operations
  getLessons(userId: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | undefined>;
  
  // Resource operations
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Forum operations
  getForumPosts(): Promise<ForumPost[]>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizzes: Map<string, Quiz>;
  private quizResults: Map<string, QuizResult>;
  private lessons: Map<string, Lesson>;
  private resources: Map<string, Resource>;
  private forumPosts: Map<string, ForumPost>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.quizzes = new Map();
    this.quizResults = new Map();
    this.lessons = new Map();
    this.resources = new Map();
    this.forumPosts = new Map();
    this.contactMessages = new Map();
    
    this.seedData();
  }

  private async seedData() {
    // Create default teacher
    const teacherId = randomUUID();
    const teacher: User = {
      id: teacherId,
      username: "teacher",
      email: "teacher@grammarmaster.com",
      password: await bcrypt.hash("password", 10),
      firstName: "John",
      lastName: "Smith",
      role: "teacher",
      avatar: null,
      createdAt: new Date(),
    };
    this.users.set(teacherId, teacher);

    // Create sample quizzes
    const quizzes = [
      {
        id: randomUUID(),
        title: "Present Tenses",
        description: "Master the use of simple present, present continuous, and present perfect tenses.",
        difficulty: "beginner",
        category: "tenses",
        timeLimit: 10,
        questions: [
          {
            id: 1,
            question: "She _______ to work every morning at 8 AM.",
            options: ["go", "goes", "going", "went"],
            correctAnswer: 1,
            explanation: "With third person singular (she/he/it) in simple present, we add 's' to the verb."
          },
          {
            id: 2,
            question: "They _______ studying English for two years.",
            options: ["are", "have been", "were", "had been"],
            correctAnswer: 1,
            explanation: "Present perfect continuous shows an action that started in the past and continues to the present."
          }
        ],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Conditional Sentences",
        description: "Learn about zero, first, second, and third conditional structures.",
        difficulty: "intermediate",
        category: "conditionals",
        timeLimit: 15,
        questions: [
          {
            id: 1,
            question: "If it _______ tomorrow, we will stay inside.",
            options: ["rain", "rains", "will rain", "rained"],
            correctAnswer: 1,
            explanation: "In first conditional, we use simple present in the if-clause and will + infinitive in the main clause."
          }
        ],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Advanced Grammar",
        description: "Challenge yourself with complex grammatical structures and rules.",
        difficulty: "advanced",
        category: "advanced",
        timeLimit: 20,
        questions: [
          {
            id: 1,
            question: "_______ the meeting been postponed, we would have had more time to prepare.",
            options: ["Had", "If", "Should", "Were"],
            correctAnswer: 0,
            explanation: "This is an inverted third conditional structure, where 'had' is moved to the beginning instead of using 'if'."
          }
        ],
        createdAt: new Date(),
      }
    ];

    quizzes.forEach(quiz => this.quizzes.set(quiz.id, quiz));

    // Create sample resources
    const resources = [
      {
        id: randomUUID(),
        title: "Complete Tenses Guide",
        description: "Comprehensive guide covering all English tenses with examples and usage rules.",
        type: "pdf",
        category: "grammar-guide",
        url: "/resources/tenses-guide.pdf",
        isPremium: false,
        fileSize: 2048576, // 2MB
        duration: null,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Mastering Conditionals",
        description: "Step-by-step video explanation of all conditional sentence types with practical examples.",
        type: "video",
        category: "video-lesson",
        url: "/resources/conditionals-video.mp4",
        isPremium: true,
        fileSize: 52428800, // 50MB
        duration: 2700, // 45 minutes
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Article Usage Practice",
        description: "Practice exercises for mastering the correct usage of articles (a, an, the).",
        type: "worksheet",
        category: "practice",
        url: "/resources/articles-worksheet.pdf",
        isPremium: false,
        fileSize: 1048576, // 1MB
        duration: null,
        createdAt: new Date(),
      }
    ];

    resources.forEach(resource => this.resources.set(resource.id, resource));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { 
      ...insertUser, 
      id, 
      password: hashedPassword,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = { ...insertQuiz, id, createdAt: new Date() };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getQuizResults(userId: string): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(result => result.userId === userId);
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const result: QuizResult = { ...insertResult, id, completedAt: new Date() };
    this.quizResults.set(id, result);
    return result;
  }

  async getLessons(userId: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => 
      lesson.studentId === userId || lesson.teacherId === userId
    );
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = { ...insertLesson, id, createdAt: new Date() };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (!lesson) return undefined;
    
    const updatedLesson = { ...lesson, ...updates };
    this.lessons.set(id, updatedLesson);
    return updatedLesson;
  }

  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = { ...insertResource, id, createdAt: new Date() };
    this.resources.set(id, resource);
    return resource;
  }

  async getForumPosts(): Promise<ForumPost[]> {
    return Array.from(this.forumPosts.values());
  }

  async createForumPost(insertPost: InsertForumPost): Promise<ForumPost> {
    const id = randomUUID();
    const post: ForumPost = { ...insertPost, id, replies: 0, createdAt: new Date() };
    this.forumPosts.set(id, post);
    return post;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id, status: "new", createdAt: new Date() };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
