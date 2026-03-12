import { Card, Button, Typography, Space } from 'antd';
import { RobotOutlined, RiseOutlined, WarningOutlined, BulbOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AIGrowthAnalysis = () => {
  return (
    <Card className="!rounded-xl shadow-card !border-0" styles={{ body: { padding: 16 } }}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl gradient-ai flex items-center justify-center flex-shrink-0">
          <RobotOutlined className="text-primary-foreground text-lg" />
        </div>
        <div className="flex-1">
          <Text strong className="text-foreground block mb-2">AI 成长分析</Text>
          <Text type="secondary" className="text-xs block mb-3">根据你的学习数据，分析如下：</Text>
          
          <Space direction="vertical" size={8} className="w-full">
            <div className="flex items-start gap-2">
              <RiseOutlined className="text-status-complete mt-0.5" />
              <Text className="text-sm text-foreground">异议处理能力提升明显（+7分）</Text>
            </div>
            <div className="flex items-start gap-2">
              <WarningOutlined className="text-destructive mt-0.5" />
              <Text className="text-sm text-foreground">谈判技巧进步较慢，建议增加练习</Text>
            </div>
            <div className="flex items-start gap-2">
              <BulbOutlined className="text-primary mt-0.5" />
              <Text className="text-sm text-foreground">推荐完成「客户异议处理进阶」课程</Text>
            </div>
          </Space>

          <Button 
            type="primary" 
            size="small" 
            block 
            className="!mt-4 !rounded-lg !h-9"
          >
            制定个性化学习计划
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIGrowthAnalysis;
