import { NAV_SECTION_IDS } from '@/constants/sections';
import { padIndex } from '@/lib/format';
import type { NavSectionId } from '@/types/section';

export function getSectionNumber(id: NavSectionId) {
  return padIndex(NAV_SECTION_IDS.indexOf(id) + 1);
}
