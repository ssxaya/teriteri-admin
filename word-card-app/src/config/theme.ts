export const themeConfig = {
  // 音标缩放：0-100（100为基准大小）
  phoneticScale: 80,
  
  // 释义缩放：0-100（100为基准大小）
  meaningScale: 90,
  
  // 圆点大小
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
