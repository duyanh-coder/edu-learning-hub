import type { ThemeConfig } from 'antd';
import { colors } from './colors';
import { env } from '../config/env';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: env.primaryColor || colors.primary,
    colorInfo: colors.info,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorText: colors.text,
    colorTextSecondary: colors.textSecondary,
    colorBorder: colors.border,
    colorBgLayout: colors.background,
    colorBgContainer: colors.surface,
    borderRadius: 8,
    borderRadiusLG: 16,
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 14,
    controlHeight: 40,
  },
  components: {
    Button: { borderRadius: 8, controlHeight: 40, fontWeight: 500 },
    Input: { borderRadius: 8, controlHeight: 42 },
    Card: { borderRadiusLG: 16 },
    Menu: { itemBorderRadius: 10 },
  },
};
