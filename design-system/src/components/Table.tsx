import * as React from 'react';
import { cx } from '../utils';

export interface TableColumn<Row> {
  /** Stable key. Used for React keys and as the default accessor. */
  key: string;
  /** Column heading. Rendered uppercase and tracked. */
  header: React.ReactNode;
  /** Cell renderer. Defaults to `row[key]`. */
  render?: (row: Row, index: number) => React.ReactNode;
  /** Right-align in tabular figures - use for every number. */
  numeric?: boolean;
  /** Fixed column width, e.g. `'160px'` or `'20%'`. */
  width?: string;
}

export interface TableProps<Row = Record<string, React.ReactNode>>
  extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Per-row React key. Defaults to the row index. */
  rowKey?: (row: Row, index: number) => string | number;
  /** Tint alternating rows. */
  striped?: boolean;
  /** Highlight the row under the cursor. */
  hoverable?: boolean;
  /** Tighter vertical rhythm, for dense data views. */
  compact?: boolean;
  /** Caption below the table. */
  caption?: React.ReactNode;
  /** Shown in place of rows when `rows` is empty. */
  emptyMessage?: React.ReactNode;
}

/**
 * A data table. Mark every numeric column `numeric: true` - it right-aligns
 * and switches to tabular figures, which is what makes a column of tonnages
 * readable.
 *
 * @example
 * <Table
 *   columns={[
 *     { key: 'project', header: 'project' },
 *     { key: 'tonnes', header: 'tCO₂', numeric: true },
 *   ]}
 *   rows={[{ project: 'Cerrado Biochar', tonnes: '128,400' }]}
 *   hoverable
 * />
 */
export function Table<Row extends object = Record<string, React.ReactNode>>({
  columns,
  rows,
  rowKey,
  striped = false,
  hoverable = false,
  compact = false,
  caption,
  emptyMessage = 'No data',
  className,
  ...rest
}: TableProps<Row>) {
  return (
    <div className="tc-table-wrapper">
      <table
        className={cx(
          'tc-table',
          striped && 'tc-table--striped',
          hoverable && 'tc-table--hoverable',
          compact && 'tc-table--compact',
          className
        )}
        {...rest}
      >
        {caption != null && <caption className="tc-table__caption">{caption}</caption>}
        <thead className="tc-table__head">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={cx('tc-table__th', column.numeric && 'tc-table__cell--numeric')}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="tc-table__empty" colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={rowKey ? rowKey(row, index) : index} className="tc-table__row">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cx('tc-table__td', column.numeric && 'tc-table__cell--numeric')}
                  >
                    {column.render
                      ? column.render(row, index)
                      : ((row as Record<string, React.ReactNode>)[column.key] ?? null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
