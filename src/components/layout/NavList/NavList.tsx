import { NAV_SECTION_IDS } from '@/constants/sections';
import { cx } from '@/lib/classNames';
import { getSectionNumber } from '@/lib/sections';
import type { NavListProps } from '@/types/components/layout';

export default function NavList({
  navigation,
  onNavigate,
  classNames,
  activeSection,
  linkTabIndex,
}: NavListProps) {
  return (
    <ul className={classNames.list}>
      {NAV_SECTION_IDS.map((id) => {
        const isActive = activeSection === id;
        return (
          <li key={id} className={classNames.item}>
            <a
              href={`#${id}`}
              onClick={(event) => onNavigate(event, id)}
              className={cx(classNames.link, isActive && classNames.active)}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={linkTabIndex}
            >
              <span className={classNames.number}>{getSectionNumber(id)}</span>
              <span>{navigation[id]}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
