import { cn } from "@/lib/utils";

interface CreatorLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CreatorLogo = ({ size = "md", className }: CreatorLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond shapes forming the Creator logo */}
        <path
          d="M25 35 L45 15 L65 35 L45 55 Z"
          fill="url(#gradient1)"
        />
        <path
          d="M35 45 L55 25 L75 45 L55 65 Z"
          fill="url(#gradient2)"
        />
        <path
          d="M45 55 L65 35 L85 55 L65 75 Z"
          fill="url(#gradient3)"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C3005E" />
            <stop offset="100%" stopColor="#812CC9" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#812CC9" />
            <stop offset="100%" stopColor="#1D80B1" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D80B1" />
            <stop offset="100%" stopColor="#591589" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};