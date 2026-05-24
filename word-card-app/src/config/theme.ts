export const themeConfig = {
  // 音标字体大小：sm|md|lg|xl
  phoneticSize: 'sm',
  
  // 释义字体大小：sm|md|lg|xl
  meaningSize: 'md',
  
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
  
  // 字体大小映射表
  phoneticFontMap: {
    sm: 'text-sm sm:text-base md:text-lg',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl',
    xl: 'text-xl sm:text-2xl md:text-3xl',
  },
  
  meaningFontMap: {
    sm: 'text-sm sm:text-base md:text-lg',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl',
    xl: 'text-xl sm:text-2xl md:text-3xl',
  },
} as const;
