import React from 'react';
import PropTypes from 'prop-types';

const TableItem = ({text}) => {
  return (
    <td className='px-4 py-2 whitespace-wrap'>
      {text}
    </td>
  );
};

TableItem.propTypes = {
    text: PropTypes.string.isRequired
}

export default TableItem;
