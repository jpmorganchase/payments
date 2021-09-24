import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const generateOptionsForCurrencyVisual = (data) => {
  const groupedData = groupTransactionsByCurrency(data);
  return {
    chart: {
      type: 'column',
    },
    xAxis: {
      type: 'category',
    },
    title: {
      text: '#Transactions by currency',
    },
    series: [
      {
        data: groupedData,
      },
    ],
  };
};

const groupTransactionsByCurrency = (data) => {
  const categories = ['EUR', 'GBP', 'USD', 'OTHER'];
  const groups = data.reduce((groups, transaction) => {
    const code = transaction.currency.code;
    if (!groups[code]) {
      groups[code] = [];
    }
    groups[code].push(transaction);
    return groups;
  }, {});
  categories.forEach((cat) => {
    if (!groups[cat]) {
      groups[cat] = [];
    }
  });
  const groupArrays = Object.keys(groups).map((code) => {
    return {
      name: code,
      y: groups[code].length,
    };
  });

  return groupArrays;
};

const TransactionViz = ({ transactions }) => {
  return (
    <div className='p-6 rounded-lg border mb-4 shadow-sm flex gap-2'>
      <div className='flex-grow'>
        <HighchartsReact
          highcharts={Highcharts}
          options={generateOptionsForCurrencyVisual(transactions)}
        />
      </div>
      <div className='flex-grow'>
        <h4 className='text-sm font-medium'>#Transactions by region</h4>
      </div>
    </div>
  );
};

TransactionViz.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionViz;
