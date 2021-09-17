import React from 'react';

const TransactionGrid = () => {
  return (
    <div className="overflow-hidden">
                    <h3 className="text-gray-500 text-sm mb-1">Today</h3>
                    <table className="min-w-full text-xs border-b border-gray-200 mb-6">
                      <thead className="border-b-2">
                        <tr>
                          <th scope="col" className="py-2 text-left font-medium text-gray-500 uppercase">
                            Type
                          </th>
                          <th scope="col" className="py-2 px-3 text-right font-medium text-gray-500 uppercase">
                            Amount
                          </th>
                          <th scope="col" className="py-2 text-left font-medium text-gray-500 uppercase">
                            Account
                          </th>
                          <th scope="col" className="py-2 text-left font-medium text-gray-500 uppercase">
                            Reference
                          </th>
                          <th scope="col" className="py-2 text-left font-medium text-gray-500 uppercase">
                            Date
                          </th>
                          <th scope="col" className="relative py-2">
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 whitespace-nowrap">
                            Credit
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap text-right">
                            <span className="font-semibold">+ 375.00</span> USD
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            00000002229292
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            0019292930
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            Mar 4, 21 - 17:30PM
                          </td>
                          <td className="py-2 whitespace-nowrap text-right text-sm font-medium">

                          </td>
                        </tr>

                      </tbody>
                    </table>
                    <h3 className="text-gray-500 text-sm mb-1">Yesterday, Mar 3, 21</h3>
                    <table className="min-w-full text-xs border-b border-gray-200  mb-6">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 whitespace-nowrap">
                            Credit
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap text-right">
                            <span className="font-semibold">+ 375.00</span> USD
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            00000002229292
                          </td>
                          <td className="py-2 whitespace-nowrap ">
                            0019292930
                          </td>
                          <td className="py-2 whitespace-nowrap ">
                            Mar 4, 21 - 17:30PM
                          </td>
                          <td className="py-2 whitespace-nowrap text-right text-sm font-medium">

                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
  );
};

export default TransactionGrid;
