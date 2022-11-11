/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { ApiDetailsInterface } from '../config';

type APIDetailsProps = {
  absolute: boolean,
  details: Pick<ApiDetailsInterface, 'name' | 'path' | 'description'> };

export default function APIDetails({ details: { name, path, description }, absolute } : APIDetailsProps) {
  return (
  // <div className="bg-black bg-opacity-80 p-8 rounded-lg text-white h-full">

    <div className={`${absolute ? 'absolute' : ''} bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full `}>

      <h1 className="text-sm">
        {name}
        {' API'}
      </h1>
      <h3 className="text-xs mb-4">{path}</h3>
      <h3 className="text-xs">{description}</h3>
    </div>
  );
}
