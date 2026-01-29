import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ReactNode } from 'react';

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#0080ff',
          colorBgBase: '#f5f8fc',
          colorTextBase: '#1a2744',
          borderRadius: 16,
          fontFamily: "'Noto Sans SC', system-ui, sans-serif",
        },
        algorithm: theme.defaultAlgorithm,
        components: {
          Button: {
            borderRadius: 12,
            controlHeight: 44,
            paddingContentHorizontal: 20,
          },
          Card: {
            borderRadiusLG: 16,
          },
          Tabs: {
            borderRadius: 12,
            itemSelectedColor: '#0080ff',
          },
          Message: {
            borderRadiusLG: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
