import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import faker from '@faker-js/faker';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Features/Virtualization',
};

export default meta;

const columns: MRT_ColumnDef[] = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Middle Name',
    id: 'middleName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Email Address',
    id: 'email',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'Zip Code',
    id: 'zipCode',
  },
  {
    header: 'City',
    id: 'city',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Country',
    id: 'country',
  },
  {
    header: 'Favorite Quote',
    id: 'favoriteQuote',
  },
  {
    header: 'Favorite Color',
    id: 'favoriteColor',
  },
  {
    header: 'Pet Name',
    id: 'petName',
  },
];

const data = [...Array(5000)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  zipCode: faker.address.zipCode(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  favoriteQuote: faker.lorem.sentence(),
  favoriteColor: faker.internet.color(),
  petName: faker.animal.cat(),
}));

const longColumns = [...Array(100)].map((_, index) => {
  const id = index.toString();
  return {
    header: id,
    id,
  };
});

const longData = [...Array(1000)].map((_) =>
  Object.fromEntries(
    longColumns.map((column) => [column.id, faker.datatype.number()]),
  ),
);

export const VirtualizationDisabledDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data.slice(0, 200)}
    enablePagination={false}
    enableToolbarBottom={false}
  />
);

export const EnableRowVirtualization: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowVirtualization
    enableToolbarBottom={false}
  />
);

export const EnableColumnVirtualization: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={longColumns}
    data={longData.slice(0, 10)}
    enableColumnVirtualization
    enablePagination={false}
    enableToolbarBottom={false}
  />
);

export const EnableAllVirtualization: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={longColumns}
    data={longData}
    enableColumnVirtualization
    enablePagination={false}
    enableRowVirtualization
    enableToolbarBottom={false}
  />
);
