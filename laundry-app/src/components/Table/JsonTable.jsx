import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Table,
} from 'reactstrap';

function JsonTable(props) {
  const { data, structure } = props;

  const headers = _.keys(structure);

  const tableHeaders = _.keys(structure).map((h, i) => <th key={i}>{h}</th>);
  const tableRows = data.map((rowObj, i) => {
    const rowData = [];
    headers.forEach(h => rowData.push(structure[h](rowObj)));
    return <tr key={i}>{rowData.map((d, j) => <td className="align-middle" key={j}>{d}</td>)}</tr>;
  });

  const noHeaders = _.every(headers, h => !h) || headers.length === 0;

  return (
    <Table bordered hover>
      { !noHeaders && (
        <thead>
          <tr>
            {tableHeaders}
          </tr>
        </thead>
      )}
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  );
}

JsonTable.propTypes = {
  structure: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default JsonTable;
