import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Tag, Typography } from 'antd';
import { PlayCircleOutlined, FileTextOutlined, ReloadOutlined, BulbOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface RelatedCourse {
  id: string;
  title: string;
  type: 'video' | 'pdf';
  tags: string[];
}

const allCourses: RelatedCourse[] = [
  { id: '1', title: '新人销售知识培训课', type: 'video', tags: ['销售技巧', '沟通能力', '心态'] },
  { id: '2', title: '新人销售知识文档', type: 'pdf', tags: ['快运服务', '货损补偿'] },
  { id: '3', title: '客户异议处理技巧', type: 'video', tags: ['异议处理', '谈判技巧', '话术'] },
  { id: '4', title: '高效谈判策略指南', type: 'pdf', tags: ['谈判策略', '成交技巧'] },
  { id: '5', title: 'SPIN销售法实战', type: 'video', tags: ['SPIN', '提问技巧', '需求挖掘'] },
  { id: '6', title: '客户心理分析手册', type: 'pdf', tags: ['心理学', '客户分析'] },
  { id: '7', title: '产品演示技巧课程', type: 'video', tags: ['产品演示', '表达能力', '可视化'] },
  { id: '8', title: '成交话术大全', type: 'pdf', tags: ['成交话术', '临门一脚'] },
  { id: '9', title: '大客户开发策略', type: 'video', tags: ['大客户', '关系维护', '长期合作'] },
  { id: '10', title: '销售团队管理手册', type: 'pdf', tags: ['团队管理', '绩效考核'] },
];

const improvementSuggestions = [
  '练习人需立即回归销售角色，重新理解客户张经理的核心痛点：多仓账单无法拆分、成本不可控、理赔效率低。必须熟悉京东门店调拨业务中\'一仓一账号\'、自动对账、调拨时效承诺、理赔闭环等核心功能，并能用简短语言直接关联客户场景。下次沟通需在30秒内提出\'可试点3个仓、7天内出对账报表\'的轻量验证方案，避免任何系统说明或中断，聚焦解决客户问题并引导下一步试点。',
  '建议加强对产品差异化优势的表达能力，特别是在面对竞品比较时，能够清晰阐述我方产品的独特价值。同时需要提升价格谈判技巧，学会将价格讨论转化为价值讨论，避免陷入单纯的价格战。',
  '需要提升倾听能力和需求挖掘技巧。在客户表达诉求时，避免急于推销产品，而应该通过开放性问题深入了解客户的实际需求和痛点，建立更好的信任关系。',
];

const getRandomCourses = (count: number): RelatedCourse[] => {
  const shuffled = [...allCourses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const getRandomSuggestion = (): string => {
  return improvementSuggestions[Math.floor(Math.random() * improvementSuggestions.length)];
};

const ImprovementSection = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<RelatedCourse[]>(() => getRandomCourses(2));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get a random suggestion once on mount
  const [suggestion] = useState<string>(() => getRandomSuggestion());

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCourses(getRandomCourses(2));
      setIsRefreshing(false);
    }, 300);
  }, []);

  const handleStartLearning = (course: RelatedCourse) => {
    navigate(`/plan/1?courseId=${course.id}&type=${course.type}`);
  };

  return (
    <>
      {/* Improvement Suggestions */}
      <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
        <div className="flex items-center gap-2 mb-3">
          <BulbOutlined className="text-primary" />
          <Text strong>改进建议</Text>
        </div>
        <Text type="secondary" className="text-sm leading-relaxed block">
          {suggestion}
        </Text>
      </Card>

      {/* Related Knowledge */}
      <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PlayCircleOutlined className="text-primary text-lg" />
            <Text strong>关联知识</Text>
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
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    {course.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        className="!m-0 !text-xs !px-2 !py-0"
                      >
                        {tag}
                      </Tag>
                    ))}
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
    </>
  );
};

export default ImprovementSection;
