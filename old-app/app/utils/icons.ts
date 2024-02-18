import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faPray } from '@fortawesome/free-solid-svg-icons/faPray';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faGuitar } from '@fortawesome/free-solid-svg-icons/faGuitar';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons/faBreadSlice';
import { faBaby } from '@fortawesome/free-solid-svg-icons/faBaby';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons/faFireAlt';

export type IconType =
  | 'announcement'
  | 'person'
  | 'prayer'
  | 'hymn'
  | 'musicalNumber'
  | 'speaker'
  | 'sacrament'
  | 'baby'
  | 'confirmation'
  | 'other';

export const IconMap: Record<IconType, IconDefinition> = {
  announcement: faBullhorn,
  person: faUserTie,
  prayer: faPray,
  hymn: faMusic,
  musicalNumber: faGuitar,
  speaker: faMicrophone,
  sacrament: faBreadSlice,
  baby: faBaby,
  confirmation: faFireAlt,
  other: faAngleRight,
};
