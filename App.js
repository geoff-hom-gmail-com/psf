import React, { Fragment } from 'react';
import './App.css';
import ExpandableProjectRow from './ExpandableProjectRow';
import Fetch from './Fetch';
import localData from './localTesting';
import PSFFooter from './PSFFooter';
import PSFHeader from './PSFHeader';
import Table from './Table';
import TableHeader from './TableHeader';

function PSF() {
  // To toggle local testing.
  // const testLocal = false;
  const testLocal = true;

  const url = 'https://jsonplaceholder.typicode.com/users/1';
  // To test fetch error, use line below.
  // const url = "https://wrongdomain.typicode.com";

  const projectTableHeader = (
    <TableHeader className="project-table-header">
      <p />
      <p className="project-name">Project name</p>
      <p className="project-quotes">Quotes</p>
      <p>New?</p>
    </TableHeader>
  );

  return (
    <div className="psf">
      <Fetch
        functionUsingData={user => (
          <Fragment>
            <PSFHeader user={user} />

            {/* A project table. Each row can expand into a quote table. */}
            <Table
              data={user.projects}
              header={projectTableHeader}
              mapFunction={ExpandableProjectRow}
              className="project-table"
            />

            <PSFFooter />
          </Fragment>
        )}
        localData={localData}
        testLocal={testLocal}
        url={url}
      />
    </div>
  );
}

export default PSF;
