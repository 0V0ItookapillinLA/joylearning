import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Tag, Typography } from 'antd';
import { PlayCircleOutlined, FileTextOutlined, ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Course {
  id: string;
  title: string;
  type: 'video' | 'pdf';
  category: string;
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

const allCourses: Course[] = [
  { id: '1', title: '新人零售采销知识培训课', type: 'video', category: '教学', duration: '36:00min', status: 'not_started' },
  { id: '2', title: '新人零售采销知识文档', type: 'pdf', category: '教学', duration: '36:00min', status: 'not_started' },
  { id: '3', title: '供应商异议处理技巧', type: 'video', category: '进阶', duration: '28:00min', status: 'not_started' },
  { id: '4', title: '高效谈判策略指南', type: 'pdf', category: '进阶', duration: '45:00min', status: 'not_started' },
  { id: '5', title: 'SPIN采销法实战', type: 'video', category: '实战', duration: '52:00min', status: 'not_started' },
  { id: '6', title: '供应商心理分析手册', type: 'pdf', category: '心理学', duration: '30:00min', status: 'not_started' },
  { id: '7', title: '产品选品技巧课程', type: 'video', category: '技巧', duration: '40:00min', status: 'not_started' },
  { id: '8', title: '采购话术大全', type: 'pdf', category: '话术', duration: '25:00min', status: 'not_started' },
  { id: '9', title: '大供应商开发策略', type: 'video', category: '高级', duration: '65:00min', status: 'in_progress' },
  { id: '10', title: '采销团队管理手册', type: 'pdf', category: '管理', duration: '50:00min', status: 'not_started' },
];

const getRandomCourses = (count: number): Course[] => {
  const shuffled = [...allCourses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const RecommendedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(() => getRandomCourses(2));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCourses(getRandomCourses(2));
      setIsRefreshing(false);
    }, 300);
  }, []);

  const handleStartLearning = (course: Course) => {
    // Navigate to plan detail with the course info
    navigate(`/plan/1?courseId=${course.id}&type=${course.type}`);
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'not_started': return '未开始';
      case 'in_progress': return '学习中';
      case 'completed': return '已完成';
    }
  };

  return (
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PlayCircleOutlined className="text-destructive text-lg" />
          <Text strong>推荐课程</Text>
        </div>
        <Button
          type="text"
          icon={<ReloadOutlined spin={isRefreshing} />}
          onClick={handleRefresh}
          disabled={isRefreshing}
        />
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {course.type === 'video' ? (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <PlayCircleOutlined className="text-primary" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <FileTextOutlined className="text-accent-foreground" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Text strong className="text-sm truncate block">{course.title}</Text>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <Tag color="default" className="!m-0 !text-xs">
                    {course.category}
                  </Tag>
                  <Text type="secondary" className="text-xs">{course.duration}</Text>
                  <Text type="secondary" className="text-xs flex items-center gap-1">
                    <ClockCircleOutlined className="text-xs" />
                    {getStatusText(course.status)}
                  </Text>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              size="small"
              onClick={() => handleStartLearning(course)}
              className="flex-shrink-0 ml-3 !rounded-lg"
            >
              开始学习
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedCourses;
