import * as React from 'react';
import { cx } from '../utils';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Image source. When absent, `initials` are shown over the pearlescent fill. */
  src?: string;
  /** Alternative text for the image. Required whenever `src` is set. */
  alt?: string;
  /** One or two letters. Ignored when `src` renders. */
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Rounded square instead of a circle. */
  square?: boolean;
  /** Blur and fade it - the ghosted duplicate silhouette from the imagery. */
  ghost?: boolean;
}

/**
 * A person or organisation mark. With no image it falls back to initials on
 * the pearlescent fill, which is the on-brand default.
 *
 * @example
 * <Avatar initials="TC" size="lg" />
 * <Avatar src="/team/ana.jpg" alt="Ana Ribeiro" />
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, initials, size = 'md', square = false, ghost = false, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cx(
        'tc-avatar',
        `tc-avatar--size-${size}`,
        square && 'tc-avatar--square',
        ghost && 'tc-avatar--ghost',
        className
      )}
      {...rest}
    >
      {src ? <img className="tc-avatar__image" src={src} alt={alt ?? ''} /> : initials}
    </span>
  );
});
