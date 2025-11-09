import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaClock, FaGraduationCap, FaMagnifyingGlass, FaBookOpen, FaStar, FaUsers } from 'react-icons/fa6';
import { Course, Enrollment } from '../types';
import { lmsService } from '../lmsService';
import { useCoachCareContext } from '../context';

const LMSDashboard: React.FC = () => {
  const { state } = useCoachCareContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!state.currentUser) return;
    
    setIsLoading(true);
    try {
      const [allCourses, userEnrollments, recommendations] = await Promise.all([
        lmsService.getCourses(),
        lmsService.getUserEnrollments(state.currentUser.id),
        lmsService.getRecommendedCourses(state.currentUser.id)
      ]);
      
      setCourses(allCourses);
      setEnrollments(userEnrollments);
      setRecommendedCourses(recommendations);
    } catch (error) {
      console.error('Error loading LMS data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [state.currentUser]);

  useEffect(() => {
    if (state.currentUser) {
      loadData();
    }
  }, [state.currentUser, loadData]);

  const handleEnroll = async (courseId: string) => {
    if (!state.currentUser) return;
    
    try {
      await lmsService.enrollUser(state.currentUser.id, courseId);
      await loadData(); // Reload data to update enrollments
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleContinueCourse = (enrollment: Enrollment) => {
    // Navigate to the course learning interface
    window.location.href = `/coachcare/lms/course/${enrollment.courseId}`;
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Learning Management System</h1>
              <p className="text-gray-600 mt-1">Enhance your coaching skills with our comprehensive courses</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Courses Completed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {enrollments.filter(e => e.status === 'completed').length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {enrollments.filter(e => e.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="leadership">Leadership</option>
              <option value="communication">Communication</option>
              <option value="goal-setting">Goal Setting</option>
              <option value="time-management">Time Management</option>
              <option value="stress-management">Stress Management</option>
              <option value="career-development">Career Development</option>
              <option value="personal-growth">Personal Growth</option>
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={() => handleEnroll(course.id)}
                  isEnrolled={enrollments.some(e => e.courseId === course.id)}
                  enrollment={enrollments.find(e => e.courseId === course.id)}
                  onContinue={handleContinueCourse}
                />
              ))}
            </div>
          </div>
        )}

        {/* Current Enrollments */}
        {enrollments.filter(e => e.status === 'in-progress').length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments
                .filter(e => e.status === 'in-progress')
                .map((enrollment) => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  if (!course) return null;
                  
                  return (
                    <CourseCard
                      key={enrollment.id}
                      course={course}
                      onEnroll={() => handleEnroll(course.id)}
                      isEnrolled={true}
                      enrollment={enrollment}
                      onContinue={handleContinueCourse}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {/* All Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => handleEnroll(course.id)}
                isEnrolled={enrollments.some(e => e.courseId === course.id)}
                enrollment={enrollments.find(e => e.courseId === course.id)}
                onContinue={handleContinueCourse}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  onEnroll: () => void;
  isEnrolled: boolean;
  enrollment?: Enrollment;
  onContinue: (enrollment: Enrollment) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, isEnrolled, enrollment, onContinue }) => {
  const getCategoryIcon = (category: Course['category']) => {
    switch (category) {
      case 'leadership':
        return <FaGraduationCap className="text-blue-500" />;
      case 'communication':
        return <FaUsers className="text-green-500" />;
      case 'goal-setting':
        return <FaStar className="text-yellow-500" />;
      case 'time-management':
        return <FaClock className="text-purple-500" />;
      case 'stress-management':
        return <FaBookOpen className="text-red-500" />;
      default:
        return <FaBookOpen className="text-gray-500" />;
    }
  };

  const getLevelBadge = (level: Course['level']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(course.category)}
            <span className="text-sm font-medium text-gray-600 capitalize">
              {course.category.replace('-', ' ')}
            </span>
          </div>
          {getLevelBadge(course.level)}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <FaClock />
              <span>{formatDuration(course.duration)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaBookOpen />
              <span>{course.modules.length} modules</span>
            </span>
          </div>
        </div>

        {isEnrolled && enrollment ? (
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${enrollment.progress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{enrollment.progress}% complete</span>
              <span className="text-gray-500 capitalize">{enrollment.status}</span>
            </div>
            <button
              onClick={() => onContinue(enrollment)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FaPlay className="text-sm" />
              <span>Continue Learning</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onEnroll}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

export default LMSDashboard;
