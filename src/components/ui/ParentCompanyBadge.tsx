import { ExternalLink } from 'lucide-react';

interface ParentCompanyBadgeProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function ParentCompanyBadge({ variant = 'light', className = '' }: ParentCompanyBadgeProps) {
  const isLight = variant === 'light';
  
  return (
    <a
      href="https://artificialstudio.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group inline-flex items-center gap-1.5 text-xs tracking-wide transition-all duration-300
        ${isLight 
          ? 'text-gray-400 hover:text-gray-700' 
          : 'text-white/50 hover:text-white'
        }
        ${className}
      `}
    >
      <span className="opacity-70">a product of</span>
      <span className={`
        font-medium relative
        ${isLight ? 'text-gray-500 group-hover:text-black' : 'text-white/70 group-hover:text-white'}
      `}>
        Artificial Studio
        <span className={`
          absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full
          ${isLight ? 'bg-black' : 'bg-white'}
        `}></span>
      </span>
      <ExternalLink className={`
        w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300
        ${isLight ? 'text-gray-500' : 'text-white/70'}
      `} />
    </a>
  );
}
