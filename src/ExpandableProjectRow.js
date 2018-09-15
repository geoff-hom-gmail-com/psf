import React from 'react';

import './App.css';
import ExpandableRow from './ExpandableRow';
import ProjectInfoRow from './ProjectInfoRow';
import QuoteRow from './QuoteRow';
import Table from './Table';
import TableHeader from './TableHeader';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html)

function ExpandableProjectRow(project) {
  const quoteTableHeader = (
    <TableHeader className="quote-table-header">
      <p className="quote-description">Description</p>
      <p className="quote-vendor">Vendor</p>
      <p className="quote-expiration">Expires</p>
      <p className="quote-cost">$</p>
    </TableHeader>
  );
  const quoteTable = (
    <Table
      className="quote-table"
      data={project.quotes}
      header={quoteTableHeader}
      mapFunction={quote => <QuoteRow data={quote} key={(keyCounter += 1)} />}
    />
  );

  return (
    <ExpandableRow
      key={(keyCounter += 1)}
      rowComponent={<ProjectInfoRow data={project} />}
      table={quoteTable}
    />
  );
}

export default ExpandableProjectRow;
