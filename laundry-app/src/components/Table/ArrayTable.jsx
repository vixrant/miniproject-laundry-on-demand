import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Table,
} from 'reactstrap';

function ArrayTable(props) {
  const { data, headers, mapData } = props;

  const tableHeaders = headers.map((h, i) => <th key={i}>{h}</th>);
  const tableRows = data.map((rowObj, i) => {
    const rowData = mapData ? mapData(rowObj) : rowObj;
    return <tr key={i}>{rowData.map((d, j) => <td className="align-middle" key={j}>{d}</td>)}</tr>;
  });

  const noHeaders = _.every(headers, h => !h);

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

ArrayTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])).isRequired,

  mapData: PropTypes.func,
};

export default ArrayTable;
