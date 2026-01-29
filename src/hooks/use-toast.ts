import { message } from 'antd';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast(options: ToastOptions) {
  const content = options.description || options.title || '';
  
  if (options.variant === 'destructive') {
    message.error(content);
  } else {
    message.success(content);
  }
}

export function useToast() {
  return { toast };
}
