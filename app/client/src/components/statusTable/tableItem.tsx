import React, { ReactElement } from 'react';
import { JsxElement } from 'typescript';

const colourStatus = (text: string) => {
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

function TableItem({ text, status }: { text:string, status?: boolean }): JSX.Element {
  return (
    <td className="py-2 whitespace-nowrap">
      {status && colourStatus(text)}
      {!status && text}
    </td>
  );
}
TableItem.defaultProps = {
  status: false,
};

export default TableItem;
