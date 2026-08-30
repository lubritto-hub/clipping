import * as React from 'react';
import { cx } from '../utils';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onChange?: (page: number) => void;
  /** How many pages to show around the current one. Defaults to `1`. */
  siblingCount?: number;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
}

function pageItems(page: number, pageCount: number, siblingCount: number): Array<number | 'gap'> {
  // Small ranges render in full - an ellipsis that hides one page helps nobody.
  if (pageCount <= 5 + siblingCount * 2) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  const left = Math.max(2, page - siblingCount);
  const right = Math.min(pageCount - 1, page + siblingCount);
  const items: Array<number | 'gap'> = [1];
  if (left > 2) items.push('gap');
  for (let i = left; i <= right; i += 1) items.push(i);
  if (right < pageCount - 1) items.push('gap');
  items.push(pageCount);
  return items;
}

/**
 * Page navigation for long lists and tables. Figures are monospaced so the
 * control does not reflow as the page number grows.
 *
 * @example
 * <Pagination page={3} pageCount={24} onChange={setPage} />
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onChange, siblingCount = 1, previousLabel = 'Prev', nextLabel = 'Next', className, ...rest },
  ref
) {
  const items = pageItems(page, pageCount, siblingCount);
  return (
    <nav ref={ref} className={cx('tc-pagination', className)} aria-label="Pagination" {...rest}>
      <button
        type="button"
        className="tc-pagination__button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        {previousLabel}
      </button>
      {items.map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="tc-pagination__ellipsis" aria-hidden="true">…</span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? 'page' : undefined}
            className={cx('tc-pagination__button', item === page && 'tc-pagination__button--active')}
            onClick={() => onChange?.(item)}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        className="tc-pagination__button"
        disabled={page >= pageCount}
        onClick={() => onChange?.(page + 1)}
      >
        {nextLabel}
      </button>
    </nav>
  );
});
