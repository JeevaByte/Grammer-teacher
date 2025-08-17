import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { BookingModal } from "@/components/booking-modal";
import { QuizInterface } from "@/components/quiz-interface";
import { ForumPostModal } from "@/components/forum-post-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Clock,
  BookOpen,
  MessageCircle,
  User,
  TrendingUp,
  CheckCircle,
  Star,
  PlayCircle,
  Download,
  Award,
  Target,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [forumPostModalOpen, setForumPostModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: quizzes } = useQuery({
    queryKey: ["/api/quizzes"],
  });

  const { data: quizResults } = useQuery({
    queryKey: ["/api/quiz-results"],
  });

  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const { data: resources } = useQuery({
    queryKey: ["/api/resources"],
  });

  const { data: forumPosts } = useQuery({
    queryKey: ["/api/forum"],
  });

  // Calculate statistics
  const totalQuizzes = quizzes?.length || 0;
  const completedQuizzes = quizResults?.length || 0;
  const averageScore = quizResults?.length 
    ? Math.round(quizResults.reduce((sum: number, result: any) => sum + ((result.score / result.totalQuestions) * 100), 0) / quizResults.length)
    : 0;
  const overallProgress = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;

  const upcomingLessons = lessons?.filter((lesson: any) => 
    new Date(lesson.scheduledAt) > new Date() && lesson.status === 'scheduled'
  ) || [];

  const recentActivity = [
    ...(quizResults?.slice(-3).map((result: any) => ({
      type: 'quiz',
      title: `Completed quiz`,
      description: `Score: ${Math.round((result.score / result.totalQuestions) * 100)}%`,
      time: result.completedAt,
      icon: CheckCircle,
    })) || []),
    ...(lessons?.slice(-2).map((lesson: any) => ({
      type: 'lesson',
      title: lesson.title,
      description: `${lesson.type} lesson`,
      time: lesson.scheduledAt,
      icon: Calendar,
    })) || []),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success-500/10 text-success-600';
      case 'intermediate': return 'bg-warning-500/10 text-warning-600';
      case 'advanced': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const startQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card shadow-lg border-r border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.[0] || "U"}
              </div>
              <div className="ml-3">
                <p className="font-semibold text-foreground">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground bg-primary/10"
                data-testid="nav-overview"
              >
                <BarChart3 className="mr-3 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                data-testid="nav-quizzes"
              >
                <Target className="mr-3 h-4 w-4" />
                Quizzes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                data-testid="nav-lessons"
              >
                <Calendar className="mr-3 h-4 w-4" />
                My Lessons
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                data-testid="nav-resources"
              >
                <BookOpen className="mr-3 h-4 w-4" />
                Resources
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                data-testid="nav-forum"
              >
                <MessageCircle className="mr-3 h-4 w-4" />
                Forum
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                data-testid="nav-profile"
              >
                <User className="mr-3 h-4 w-4" />
                Profile
              </Button>
            </div>
            
            <div className="mt-8 px-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={logout}
                data-testid="nav-logout"
              >
                <Award className="mr-3 h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-card shadow-sm border-b border-border">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {user?.firstName}!
                  </h1>
                  <p className="text-muted-foreground">Continue your grammar learning journey</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="relative" data-testid="notifications">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                  </Button>
                  <Button onClick={() => setBookingModalOpen(true)} data-testid="book-lesson">
                    Book Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="quizzes" data-testid="tab-quizzes">Quizzes</TabsTrigger>
                <TabsTrigger value="lessons" data-testid="tab-lessons">Lessons</TabsTrigger>
                <TabsTrigger value="resources" data-testid="tab-resources">Resources</TabsTrigger>
                <TabsTrigger value="forum" data-testid="tab-forum">Forum</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="progress-percentage">
                        {overallProgress}%
                      </div>
                      <Progress value={overallProgress} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="completed-quizzes">
                        {completedQuizzes}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        out of {totalQuizzes} available
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="average-score">
                        {averageScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {averageScore >= 80 ? 'Excellent!' : averageScore >= 60 ? 'Good progress' : 'Keep practicing'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Next Lesson</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold" data-testid="next-lesson">
                        {upcomingLessons.length > 0 ? (
                          <>
                            <div>
                              {new Date(upcomingLessons[0].scheduledAt).toLocaleDateString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(upcomingLessons[0].scheduledAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </>
                        ) : (
                          <>
                            <div>No lessons</div>
                            <p className="text-sm text-muted-foreground">Schedule one</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & Recommendations */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                          recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <activity.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.description} • {new Date(activity.time).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No recent activity</p>
                            <p className="text-sm text-muted-foreground">Start taking quizzes to see your activity here</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {quizzes?.slice(0, 2).map((quiz: any) => (
                          <div key={quiz.id} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <h4 className="font-medium text-foreground mb-2">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>
                            <Button
                              size="sm"
                              onClick={() => startQuiz(quiz.id)}
                              data-testid={`start-quiz-${quiz.id}`}
                            >
                              Start Practice →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quizzes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Interactive Quizzes</h2>
                  <p className="text-muted-foreground">Test your grammar knowledge</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes?.map((quiz: any) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Target className="h-8 w-8 text-primary" />
                          <Badge className={getDifficultyColor(quiz.difficulty)}>
                            {quiz.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>
                            <Target className="inline mr-1 h-3 w-3" />
                            {quiz.questions?.length || 0} questions
                          </span>
                          <span>
                            <Clock className="inline mr-1 h-3 w-3" />
                            {quiz.timeLimit} min
                          </span>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => startQuiz(quiz.id)}
                          data-testid={`quiz-start-${quiz.id}`}
                        >
                          Start Quiz
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quiz Results History */}
                {quizResults && quizResults.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {quizResults.slice(-5).map((result: any) => (
                          <div key={result.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">Quiz Result</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(result.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                (result.score / result.totalQuestions) >= 0.8 
                                  ? "bg-success-500/10 text-success-600"
                                  : (result.score / result.totalQuestions) >= 0.6
                                  ? "bg-warning-500/10 text-warning-600"
                                  : "bg-destructive/10 text-destructive"
                              }>
                                {Math.round((result.score / result.totalQuestions) * 100)}%
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {result.score}/{result.totalQuestions}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="lessons" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">My Lessons</h2>
                  <Button onClick={() => setBookingModalOpen(true)} data-testid="book-new-lesson">
                    Book New Lesson
                  </Button>
                </div>

                {lessons && lessons.length > 0 ? (
                  <div className="grid gap-6">
                    {lessons.map((lesson: any) => (
                      <Card key={lesson.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{lesson.title}</CardTitle>
                            <Badge variant={
                              lesson.status === 'completed' ? 'default' :
                              lesson.status === 'scheduled' ? 'secondary' : 'destructive'
                            }>
                              {lesson.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {lesson.description || `${lesson.type} lesson - ${lesson.focusArea}`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Date & Time</p>
                              <p className="font-medium">
                                {new Date(lesson.scheduledAt).toLocaleDateString()} at{' '}
                                {new Date(lesson.scheduledAt).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium">{lesson.duration} minutes</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-medium">${(lesson.price / 100).toFixed(2)}</p>
                            </div>
                          </div>
                          {lesson.notes && (
                            <div className="mt-4">
                              <p className="text-muted-foreground text-sm">Notes</p>
                              <p className="text-sm">{lesson.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">No lessons scheduled</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Book your first lesson to start personalized grammar instruction
                      </p>
                      <Button onClick={() => setBookingModalOpen(true)} data-testid="book-first-lesson">
                        Book Your First Lesson
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Learning Resources</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources?.map((resource: any) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            {resource.type === 'video' ? (
                              <PlayCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <BookOpen className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <Badge variant={resource.isPremium ? "default" : "secondary"}>
                            {resource.isPremium ? "Premium" : "Free"}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {resource.type === 'video' ? (
                              <span>{Math.round(resource.duration / 60)} minutes</span>
                            ) : (
                              <span>{Math.round(resource.fileSize / 1024 / 1024)} MB</span>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            data-testid={`resource-${resource.id}`}
                            onClick={() => {
                              if (resource.type === 'video') {
                                window.open(resource.url, '_blank');
                              } else {
                                const link = document.createElement('a');
                                link.href = resource.url;
                                link.download = resource.title;
                                link.click();
                              }
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {resource.type === 'video' ? 'Watch' : 'Download'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="forum" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Discussion Forum</h2>
                  <Button onClick={() => setForumPostModalOpen(true)} data-testid="new-post">New Post</Button>
                </div>

                {forumPosts && forumPosts.length > 0 ? (
                  <div className="space-y-4">
                    {forumPosts.map((post: any) => (
                      <Card key={post.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription>
                            Posted on {new Date(post.createdAt).toLocaleDateString()} • {post.replies} replies
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <Badge variant="outline">{post.category}</Badge>
                            <Button variant="ghost" size="sm" data-testid={`view-post-${post.id}`}>
                              View Discussion
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">No forum posts yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Start a discussion to connect with other students
                      </p>
                      <Button onClick={() => setForumPostModalOpen(true)} data-testid="create-first-post">Create First Post</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
      />
      
      <ForumPostModal
        isOpen={forumPostModalOpen}
        onClose={() => setForumPostModalOpen(false)}
      />
      
      {selectedQuizId && (
        <QuizInterface
          quizId={selectedQuizId}
          isOpen={true}
          onClose={() => setSelectedQuizId(null)}
        />
      )}
    </div>
  );
}
