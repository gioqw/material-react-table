import React, { FC, RefObject } from 'react';
import { alpha, lighten, TableRow } from '@mui/material';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { MRT_DraggableTableHeadCell } from './MRT_DraggableTableHeadCell';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';
import { useVirtual } from 'react-virtual';

interface Props {
  headerGroup: MRT_HeaderGroup;
  tableInstance: MRT_TableInstance;
  tableContainerRef: RefObject<HTMLDivElement>;
}

export const MRT_TableHeadRow: FC<Props> = ({
  headerGroup,
  tableContainerRef,
  tableInstance,
}) => {
  const {
    options: {
      enableColumnOrdering,
      enableColumnVirtualization,
      enableGrouping,
      muiTableHeadRowProps,
    },
  } = tableInstance;

  const { headers } = headerGroup;

  const columnVirtualizer = enableColumnVirtualization
    ? useVirtual({
        horizontal: true,
        overscan: 3,
        size: headers.length,
        parentRef: tableContainerRef,
      })
    : ({} as any);

  const { virtualItems: virtualHeaders } = columnVirtualizer;
  const paddingLeft = virtualHeaders?.length > 0 ? virtualHeaders[0].start : 0;
  const paddingRight =
    virtualHeaders?.length > 0
      ? columnVirtualizer.totalSize -
        virtualHeaders[virtualHeaders.length - 1].end
      : 0;

  const tableRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps({ headerGroup, tableInstance })
      : muiTableHeadRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        ...(tableRowProps?.sx as any),
      })}
    >
      {enableColumnVirtualization && paddingLeft > 0 && (
        <th>
          <span style={{ width: `${paddingLeft}px` }} />
        </th>
      )}
      {/* @ts-ignore */}
      {(enableColumnVirtualization ? virtualHeaders : headers).map(
        (headerOrVirtualHeader: any, index: number) => {
          const header = enableColumnVirtualization
            ? (headers[headerOrVirtualHeader.index] as MRT_Header)
            : (headerOrVirtualHeader as MRT_Header);
          return enableColumnOrdering || enableGrouping ? (
            <MRT_DraggableTableHeadCell
              header={header}
              key={header.id || index}
              tableInstance={tableInstance}
            />
          ) : (
            <MRT_TableHeadCell
              header={header}
              key={header.id || index}
              tableInstance={tableInstance}
            />
          );
        },
      )}
      {enableColumnVirtualization && paddingLeft > 0 && (
        <th>
          <span style={{ width: `${paddingRight}px` }} />
        </th>
      )}
    </TableRow>
  );
};
