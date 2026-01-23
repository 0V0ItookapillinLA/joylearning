import { Award } from 'lucide-react';

// Mock data for check-in days
const checkInData = {
  totalDays: 1130,
  currentStreak: 7,
  months: [
    {
      month: '1月',
      year: 2026,
      totalDays: 25,
      checkedDays: [2, 3, 4, 5, 6, 7, 8, 10, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    },
    {
      month: '12月',
      year: 2025,
      totalDays: 24,
      checkedDays: [2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 29, 30]
    },
    {
      month: '11月',
      year: 2025,
      totalDays: 25,
      checkedDays: [1, 3, 4, 5, 6, 7, 8, 10, 11, 15, 16, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30]
    }
  ]
};

const CalendarTab = () => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const monthNameToNumber = (monthName: string): number => {
    const monthMap: Record<string, number> = {
      '1月': 1, '2月': 2, '3月': 3, '4月': 4, '5月': 5, '6月': 6,
      '7月': 7, '8月': 8, '9月': 9, '10月': 10, '11月': 11, '12月': 12
    };
    return monthMap[monthName] || 1;
  };

  return (
    <div className="space-y-4">
      {/* Streak Card */}
      <div className="bg-gradient-to-r from-primary/80 to-primary rounded-xl p-4 text-primary-foreground relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold">{checkInData.currentStreak}</span>
            <span className="text-lg">连胜</span>
          </div>
          <p className="text-sm opacity-90">您已累计打卡 {checkInData.totalDays} 天</p>
          <p className="text-sm opacity-90">连续打卡 {checkInData.currentStreak} 天</p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
          <Award className="w-20 h-20" />
        </div>
      </div>

      {/* Calendar Months */}
      {checkInData.months.map((monthData) => {
        const monthNumber = monthNameToNumber(monthData.month);
        const daysInMonth = getDaysInMonth(monthNumber, monthData.year);
        const firstDay = getFirstDayOfMonth(monthNumber, monthData.year);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

        return (
          <div key={`${monthData.year}-${monthData.month}`} className="space-y-3">
            <h3 className="font-medium text-foreground">
              {monthData.month} · 累计打卡 <span className="text-primary font-bold">{monthData.totalDays}</span> 天
            </h3>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Week headers */}
              {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-1">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for first week */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}
              
              {/* Days */}
              {days.map((day) => {
                const isChecked = monthData.checkedDays.includes(day);
                return (
                  <div key={day} className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-1">{day}</span>
                    <div 
                      className={`w-8 h-8 rounded-lg ${
                        isChecked 
                          ? 'bg-primary/80' 
                          : 'bg-muted'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarTab;
