import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { IconMap, IconType } from '~/utils/icons';

type Props = {
  icon: IconType;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
};

export const ListItem = ({
  icon,
  title,
  subtitle,
  description,
  url,
}: Props) => {
  const Component = url ? 'a' : 'div';

  return (
    <Component
      className="flex gap-4 items-center"
      href={url ? url : undefined}
      target={url ? '_blank' : undefined}
    >
      <div className="flex items-center">
        <FontAwesomeIcon icon={IconMap[icon]} className="size-12" />
      </div>
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        {subtitle ? <div className="italic opacity-60">{subtitle}</div> : null}
        {description ? <div className="mt-2">{description}</div> : null}
      </div>
    </Component>
  );
};
