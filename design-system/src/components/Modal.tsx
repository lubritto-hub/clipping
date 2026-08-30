import * as React from 'react';
import { cx } from '../utils';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is shown. Nothing renders when false. */
  open: boolean;
  /** Called on the close control, the overlay click and the Escape key. */
  onClose?: () => void;
  /** Dialog heading. */
  title?: React.ReactNode;
  /** Supporting line under the title. */
  description?: React.ReactNode;
  /** Action row, pinned below a hairline rule. Usually two Buttons. */
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Hide the × control. Pair with an explicit footer action. */
  hideCloseButton?: boolean;
  /** Ignore clicks on the backdrop. */
  disableOverlayClose?: boolean;
  /**
   * Confine the backdrop to the nearest positioned ancestor instead of the
   * viewport. Use it to embed a dialog inside a documentation panel or a
   * preview frame; leave it off for a real dialog.
   */
  contained?: boolean;
  children?: React.ReactNode;
}

/**
 * A centred dialog over a blurred backdrop - the frosted-glass treatment is
 * what places it in this system rather than a plain scrim.
 *
 * Renders inline (no portal), so mount it inside your
 * `TerraCarbonProvider` to inherit the theme.
 *
 * @example
 * <Modal open={open} onClose={close} title="Retire credits"
 *   footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button>Retire</Button></>}>
 *   <Text>This permanently retires 1,200 tCO₂ and cannot be undone.</Text>
 * </Modal>
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { open, onClose, title, description, footer, size = 'md', hideCloseButton = false, disableOverlayClose = false, contained = false, children, className, ...rest },
  ref
) {
  React.useEffect(() => {
    if (!open || !onClose) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const titleId = 'tc-modal-title';

  return (
    <div
      className={cx('tc-modal-overlay', contained && 'tc-modal-overlay--contained')}
      onClick={disableOverlayClose ? undefined : () => onClose?.()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        onClick={(event) => event.stopPropagation()}
        className={cx('tc-modal', `tc-modal--size-${size}`, className)}
        {...rest}
      >
        {(title != null || description != null || !hideCloseButton) && (
          <div className="tc-modal__header">
            <div>
              {title != null && <h2 className="tc-modal__title" id={titleId}>{title}</h2>}
              {description != null && <p className="tc-modal__description">{description}</p>}
            </div>
            {!hideCloseButton && (
              <button type="button" className="tc-modal__close" onClick={() => onClose?.()} aria-label="Close">
                &times;
              </button>
            )}
          </div>
        )}
        {children != null && <div className="tc-modal__body">{children}</div>}
        {footer != null && <div className="tc-modal__footer">{footer}</div>}
      </div>
    </div>
  );
});
