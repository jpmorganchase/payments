import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const generateOptionsForCurrencyVisual = (data) => {
  const categories = ['EUR', 'GBP', 'USD', 'OTHER'];
  const groups = data.reduce((groups, transaction) => {
    const code = transaction.currency.code;
    if (!groups[code]) {
      groups[code] = [];
    }
    groups[code].push(transaction);
    return groups;
  }, {});
  const groupedData = groupTransactions(groups, categories);
  return genOptions(groupedData, '#Transactions by currency');
};

const genOptions = (data, title) => {
  // todo https://www.highcharts.com/docs/chart-design-and-style/colors
  return {
    chart: {
      type: 'column',
      height: 200,
      style: {
        fontFamily: "'Inter', sans-serif",
      },
    },
    colors: ['#BE185D', '#DB2777', '#DC2626', '#BE185D'],
    yAxis: {
      title: {
        enabled: false,
      },
    },
    xAxis: {
      type: 'category',
    },
    title: {
      text: title,
      style: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 500,
      },
    },
    series: [
      {
        data: data,
        colorByPoint: true,
      },
    ],
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          },
        },
      ],
    },
  };
};

const generateOptionsForTypeVisual = (data) => {
  const categories = ['DEBIT', 'CREDIT'];
  const groups = data.reduce((groups, transaction) => {
    const code = transaction.debitCreditCode;
    if (!groups[code]) {
      groups[code] = 0;
    }
    groups[code] += transaction.amount;
    return groups;
  }, {});
  const groupedData = groupTransactions(groups, categories, true);
  return genOptions(groupedData, 'Total debits & credits');
};

const groupTransactions = (groups, categories, numeric = false) => {
  categories.forEach((cat) => {
    if (!groups[cat]) {
      if (numeric) {
        groups[cat] = 0;
      } else {
        groups[cat] = [];
      }
    }
  });
  const groupArrays = Object.keys(groups).map((code) => {
    return {
      name: code,
      y: numeric ? groups[code] : groups[code].length,
    };
  });

  return groupArrays;
};

const TransactionViz = ({ transactions }) => {
  return (
    <div className='p-6 rounded-lg border mb-4 shadow-sm flex gap-2 h-60'>
      <div className='w-1/3'>
        <HighchartsReact
          highcharts={Highcharts}
          options={generateOptionsForCurrencyVisual(transactions)}
        />
      </div>
      <div className='w-1/3'>
        <HighchartsReact
          highcharts={Highcharts}
          options={generateOptionsForTypeVisual(transactions)}
        />
      </div>
    </div>
  );
};

TransactionViz.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionViz;
