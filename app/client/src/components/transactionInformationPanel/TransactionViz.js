import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const generateOptionsForDateVisual = (data) => {
  const chartData = [];
  data.map((dateGroup) => {
    chartData.push({
      name: dateGroup.date,
      y: dateGroup.transactions.length,
    });
  });

  return genOptions(chartData, '#Transactions by date');
};

const genOptions = (data, title) => {
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
        fontSize: 16,
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
  const chartData = [];
  data.map((transaction) => {
    chartData.push({
      name: transaction.debitCreditCode,
      y: transaction.amount,
    });
  });

  return genOptions(chartData, 'Total debits & credits');
};

const TransactionViz = ({ transactions, groupedByDay }) => {
  return (
    <div className='p-6 rounded-lg border mb-4 shadow-sm flex gap-2 h-60'>
      <div className='w-1/2'>
        <HighchartsReact
          highcharts={Highcharts}
          options={generateOptionsForDateVisual(groupedByDay)}
        />
      </div>
      <div className='w-1/2'>
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
  groupedByDay: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionViz;
