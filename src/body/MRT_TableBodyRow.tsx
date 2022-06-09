import React, { FC, MouseEvent, RefObject } from 'react';
import { darken, lighten, TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';
import { useVirtual } from 'react-virtual';

interface Props {
  row: MRT_Row;
  tableContainerRef: RefObject<HTMLDivElement>;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({
  row,
  tableContainerRef,
  tableInstance,
}) => {
  const {
    getIsSomeColumnsPinned,
    options: {
      enableColumnVirtualization,
      muiTableBodyRowProps,
      onMrtRowClick,
      renderDetailPanel,
    },
  } = tableInstance;

  const cells = row.getVisibleCells();

  const cellVirtualizer = enableColumnVirtualization
    ? useVirtual({
        overscan: 3,
        horizontal: true,
        size: cells.length,
        parentRef: tableContainerRef,
      })
    : ({} as any);

  const { virtualItems: virtualCells } = cellVirtualizer;
  const paddingLeft = virtualCells?.length > 0 ? virtualCells[0].start : 0;
  const paddingRight =
    virtualCells?.length > 0
      ? cellVirtualizer.totalSize - virtualCells[virtualCells.length - 1].end
      : 0;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, tableInstance })
      : muiTableBodyRowProps;

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onMrtRowClick?.({ event, row, tableInstance })
        }
        selected={row.getIsSelected()}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          transition: 'all 0.2s ease-in-out',
          '&:hover td': {
            backgroundColor:
              tableRowProps?.hover !== false && getIsSomeColumnsPinned()
                ? theme.palette.mode === 'dark'
                  ? `${lighten(theme.palette.background.default, 0.12)}`
                  : `${darken(theme.palette.background.default, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx as any),
        })}
      >
        {enableColumnVirtualization && paddingLeft > 0 && (
          <td>
            <span style={{ width: `${paddingLeft}px` }} />
          </td>
        )}
        {/* @ts-ignore */}
        {(enableColumnVirtualization ? virtualCells : cells).map(
          (cellOrVirtualCell: any) => {
            const cell = enableColumnVirtualization
              ? cells[cellOrVirtualCell.index]
              : cellOrVirtualCell;
            return (
              <MRT_TableBodyCell
                cell={cell}
                key={cell.id}
                enableHover={tableRowProps?.hover !== false}
                tableInstance={tableInstance}
              />
            );
          },
        )}
        {enableColumnVirtualization && paddingLeft > 0 && (
          <td>
            <span style={{ width: `${paddingRight}px` }} />
          </td>
        )}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} tableInstance={tableInstance} />
      )}
    </>
  );
};
