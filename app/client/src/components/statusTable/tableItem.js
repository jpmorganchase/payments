import React from 'react';
import PropTypes from 'prop-types';

const colourStatus = (text) => {
  if (text === 'COMPLETE') {
    return (
      <span
        data-cy="completeTab"
        className="px-2 inline-flex text-xs leading-5 rounded bg-green-100 text-green-800"
      >
        {text}
      </span>
    );
  } if (text === 'INTERMITTENT') {
    return (
      <span
        data-cy="intermittentTab"
        className="px-2 inline-flex text-xs leading-5 rounded bg-red-100 text-red-800"
      >
        {text}
      </span>
    );
  }
  return (
    <span
      data-cy="defaultTab"
      className="px-2 inline-flex text-xs leading-5 rounded bg-blue-100 text-blue-800"
    >
      {text}
    </span>
  );
};
function TableItem({ text, status }) {
  return (
    <td className="py-2 whitespace-nowrap">
      {status && colourStatus(text)}
      {!status && text}
    </td>
  );
}

TableItem.propTypes = {
  text: PropTypes.string,
  status: PropTypes.bool,
};

export default TableItem;
