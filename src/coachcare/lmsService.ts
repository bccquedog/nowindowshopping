import { Course, Module, Lesson, Enrollment, Progress, Quiz, Assignment } from './types';

// Mock course data
const mockCourses: Course[] = [
  {
    id: 'course1',
    title: 'Effective Communication Skills',
    description: 'Master the art of communication to build stronger relationships and achieve your goals.',
    category: 'communication',
    level: 'beginner',
    duration: 180, // 3 hours
    modules: [
      {
        id: 'module1',
        courseId: 'course1',
        title: 'Foundations of Communication',
        description: 'Learn the basic principles of effective communication',
        order: 1,
        duration: 45,
        lessons: [
          {
            id: 'lesson1',
            moduleId: 'module1',
            title: 'Understanding Communication Styles',
            description: 'Identify different communication styles and their impact',
            order: 1,
            duration: 15,
            type: 'video',
            content: {
              videoUrl: 'https://example.com/video1.mp4',
              textContent: 'Communication styles vary from person to person...'
            },
            resources: [
              {
                name: 'Communication Styles Guide',
                url: '/resources/communication-styles.pdf',
                type: 'pdf'
              }
            ],
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'lesson2',
            moduleId: 'module1',
            title: 'Active Listening Techniques',
            description: 'Develop active listening skills for better understanding',
            order: 2,
            duration: 20,
            type: 'text',
            content: {
              textContent: 'Active listening is a skill that requires practice...'
            },
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'lesson3',
            moduleId: 'module1',
            title: 'Communication Assessment',
            description: 'Test your understanding of communication principles',
            order: 3,
            duration: 10,
            type: 'quiz',
            content: {
              quiz: {
                id: 'quiz1',
                lessonId: 'lesson3',
                title: 'Communication Fundamentals Quiz',
                questions: [
                  {
                    id: 'q1',
                    question: 'What is the most important aspect of active listening?',
                    type: 'multiple-choice',
                    options: ['Interrupting to ask questions', 'Maintaining eye contact', 'Understanding the speaker\'s perspective', 'Taking notes'],
                    correctAnswer: 'Understanding the speaker\'s perspective',
                    points: 10,
                    explanation: 'Active listening is about truly understanding what the speaker is saying, not just hearing the words.'
                  }
                ],
                passingScore: 70,
                attemptsAllowed: 3,
                createdAt: new Date().toISOString()
              }
            },
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    prerequisites: [],
    learningObjectives: [
      'Understand different communication styles',
      'Develop active listening skills',
      'Apply communication techniques in real situations'
    ],
    thumbnail: '/assets/course-thumbnails/communication.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course2',
    title: 'Goal Setting and Achievement',
    description: 'Learn proven strategies for setting and achieving meaningful goals.',
    category: 'goal-setting',
    level: 'intermediate',
    duration: 120, // 2 hours
    modules: [
      {
        id: 'module2',
        courseId: 'course2',
        title: 'SMART Goal Framework',
        description: 'Master the SMART goal-setting methodology',
        order: 1,
        duration: 60,
        lessons: [
          {
            id: 'lesson4',
            moduleId: 'module2',
            title: 'What Makes Goals SMART?',
            description: 'Learn the five criteria for effective goal setting',
            order: 1,
            duration: 20,
            type: 'video',
            content: {
              videoUrl: 'https://example.com/video2.mp4',
              textContent: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound...'
            },
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    prerequisites: ['course1'],
    learningObjectives: [
      'Understand the SMART goal framework',
      'Create actionable goal plans',
      'Track progress effectively'
    ],
    thumbnail: '/assets/course-thumbnails/goal-setting.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock enrollment data
const mockEnrollments: Enrollment[] = [
  {
    id: 'enrollment1',
    userId: 'user1',
    courseId: 'course1',
    status: 'in-progress',
    progress: 65,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 'enrollment2',
    userId: 'user1',
    courseId: 'course2',
    status: 'enrolled',
    progress: 0,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];

// Mock progress data
const mockProgress: Progress[] = [
  {
    id: 'progress1',
    userId: 'user1',
    courseId: 'course1',
    moduleId: 'module1',
    lessonId: 'lesson1',
    status: 'completed',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    timeSpent: 15,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 'progress2',
    userId: 'user1',
    courseId: 'course1',
    moduleId: 'module1',
    lessonId: 'lesson2',
    status: 'completed',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    timeSpent: 20,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: 'progress3',
    userId: 'user1',
    courseId: 'course1',
    moduleId: 'module1',
    lessonId: 'lesson3',
    status: 'in-progress',
    timeSpent: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  }
];

class LMSService {
  private courses: Course[] = [...mockCourses];
  private enrollments: Enrollment[] = [...mockEnrollments];
  private progress: Progress[] = [...mockProgress];

  // Get all courses
  async getCourses(): Promise<Course[]> {
    return this.courses.filter(course => course.isPublished);
  }

  // Get course by ID
  async getCourse(courseId: string): Promise<Course | null> {
    return this.courses.find(course => course.id === courseId) || null;
  }

  // Get courses by category
  async getCoursesByCategory(category: Course['category']): Promise<Course[]> {
    return this.courses.filter(course => course.category === category && course.isPublished);
  }

  // Get courses by level
  async getCoursesByLevel(level: Course['level']): Promise<Course[]> {
    return this.courses.filter(course => course.level === level && course.isPublished);
  }

  // Get user enrollments
  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return this.enrollments.filter(enrollment => enrollment.userId === userId);
  }

  // Get enrollment by ID
  async getEnrollment(enrollmentId: string): Promise<Enrollment | null> {
    return this.enrollments.find(enrollment => enrollment.id === enrollmentId) || null;
  }

  // Enroll user in course
  async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
    const existingEnrollment = this.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (existingEnrollment) {
      throw new Error('User is already enrolled in this course');
    }

    const enrollment: Enrollment = {
      id: Date.now().toString(),
      userId,
      courseId,
      status: 'enrolled',
      progress: 0,
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.enrollments.push(enrollment);
    return enrollment;
  }

  // Update enrollment status
  async updateEnrollmentStatus(enrollmentId: string, status: Enrollment['status']): Promise<void> {
    const enrollment = this.enrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
      enrollment.status = status;
      enrollment.updatedAt = new Date().toISOString();
      
      if (status === 'completed') {
        enrollment.completionDate = new Date().toISOString();
      }
    }
  }

  // Get user progress for a course
  async getUserProgress(userId: string, courseId: string): Promise<Progress[]> {
    return this.progress.filter(p => p.userId === userId && p.courseId === courseId);
  }

  // Update lesson progress
  async updateLessonProgress(
    userId: string,
    courseId: string,
    moduleId: string,
    lessonId: string,
    status: Progress['status'],
    timeSpent: number,
    score?: number
  ): Promise<Progress> {
    let progress = this.progress.find(
      p => p.userId === userId && p.courseId === courseId && p.moduleId === moduleId && p.lessonId === lessonId
    );

    if (progress) {
      progress.status = status;
      progress.timeSpent = timeSpent;
      progress.score = score;
      progress.updatedAt = new Date().toISOString();
      
      if (status === 'completed') {
        progress.completedAt = new Date().toISOString();
      }
    } else {
      progress = {
        id: Date.now().toString(),
        userId,
        courseId,
        moduleId,
        lessonId,
        status,
        timeSpent,
        score,
        completedAt: status === 'completed' ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.progress.push(progress);
    }

    // Update enrollment progress
    await this.updateEnrollmentProgress(userId, courseId);

    return progress;
  }

  // Update enrollment progress percentage
  private async updateEnrollmentProgress(userId: string, courseId: string): Promise<void> {
    const enrollment = this.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (!enrollment) return;

    const course = await this.getCourse(courseId);
    if (!course) return;

    const totalLessons = course.modules.reduce((total, module) => {
      return total + module.lessons.length;
    }, 0);

    const completedLessons = this.progress.filter(
      p => p.userId === userId && p.courseId === courseId && p.status === 'completed'
    ).length;

    enrollment.progress = Math.round((completedLessons / totalLessons) * 100);
    enrollment.updatedAt = new Date().toISOString();
    enrollment.lastAccessed = new Date().toISOString();

    // Update status to completed if progress is 100%
    if (enrollment.progress === 100 && enrollment.status !== 'completed') {
      enrollment.status = 'completed';
      enrollment.completionDate = new Date().toISOString();
    }
  }

  // Get course completion certificate
  async getCertificate(userId: string, courseId: string): Promise<{ id: string; name: string; issuedDate: string; url: string } | null> {
    const enrollment = this.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (!enrollment || enrollment.status !== 'completed') return null;

    const course = await this.getCourse(courseId);
    if (!course) return null;

    return {
      id: `cert_${enrollment.id}`,
      name: `${course.title} Certificate`,
      issuedDate: enrollment.completionDate!,
      url: `/certificates/${enrollment.id}.pdf`
    };
  }

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.courses.filter(course => 
      course.isPublished && (
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.category.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  // Get recommended courses for user
  async getRecommendedCourses(userId: string): Promise<Course[]> {
    const userEnrollments = await this.getUserEnrollments(userId);
    const completedCourses = userEnrollments.filter(e => e.status === 'completed').map(e => e.courseId);
    
    // For now, return courses that are not completed
    return this.courses.filter(course => 
      course.isPublished && !completedCourses.includes(course.id)
    ).slice(0, 3); // Return top 3 recommendations
  }
}

export const lmsService = new LMSService();
