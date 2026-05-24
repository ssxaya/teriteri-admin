export const themeConfig = {
  // 音标字体大小（单位：px）
  phoneticSize: 16,
  
  // 释义字体大小（单位：px）
  meaningSize: 18,
  
  // 圆点大小（单位：Tailwind尺寸）
  dotSize: 'w-2 h-2',
  
  // 颜色配置
  colors: {
    word: 'text-slate-800',
    phonetic: 'text-slate-400',
    meaning: 'text-slate-600',
    dotActive: 'bg-slate-800',
    dotInactive: 'bg-slate-300',
  },
} as const;
