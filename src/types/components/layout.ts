import type { MouseEvent, ReactNode, RefObject } from 'react';
import type { NavigationData } from '@/types/portfolio';
import type { NavSectionId, SectionId } from '@/types/section';

export type SectionNavigateHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  id: SectionId,
) => void;

export interface HeaderProps {
  navigation: NavigationData;
  activeSection: string;
}

export interface NavListClassNames {
  list: string;
  item?: string;
  link: string;
  active?: string;
  number: string;
}

export interface NavListProps {
  navigation: NavigationData;
  onNavigate: SectionNavigateHandler;
  classNames: NavListClassNames;
  activeSection?: string;
  linkTabIndex?: number;
}

export interface MobileMenuProps {
  open: boolean;
  navigation: NavigationData;
  onNavigate: SectionNavigateHandler;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

export interface LangToggleProps {
  label: string;
}

export interface SectionProps {
  id: NavSectionId;
  label: string;
  titleId: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export interface SectionTitleProps {
  id: string;
  children: string;
  drift?: number;
  className?: string;
}
