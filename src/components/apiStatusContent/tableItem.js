import React from 'react';
import PropTypes from 'prop-types';

const colourStatus = (text) => {
    if(text === 'COMPLETE'){
        return (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
            {text}
          </span>
        )
    }else if (text === 'INTERMITTENT') {
        return (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800'>
            {text}
          </span>
        )
    }
    return (
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800'>
        {text}
      </span>
    )
}
const TableItem = ({ text, status }) => {
  return (
    <td className='px-4 py-2 whitespace-wrap'>
      {status && (
        colourStatus(text)
      )}
      {!status && (
          text
      )}
    </td>
  );
};

TableItem.propTypes = {
  text: PropTypes.string,
  status: PropTypes.bool,
};

export default TableItem;
