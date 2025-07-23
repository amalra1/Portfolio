import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AllOutIcon from '@mui/icons-material/AllOut';

type IconProps = {
  name: string;
  className?: string;
};

const iconMap: { [key: string]: React.ElementType } = {
  Visibility: VisibilityOutlinedIcon,
  Cached: CachedOutlinedIcon,
  SportsEsports: SportsEsportsOutlinedIcon,
  Cloud: CloudOutlinedIcon,
  Code: CodeOutlinedIcon,
  AutoAwesome: AutoAwesomeOutlinedIcon,
};

export default function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name] || AllOutIcon;
  return <IconComponent className={className} />;
}
