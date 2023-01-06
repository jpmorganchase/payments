import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { GroupByDayType, TransactionType } from '../../types/transactionTypes';

type TransactionVisProps = {
  transactions:TransactionType[],
  groupedByDay: GroupByDayType[]
};

type ChartDataType = {
  name: string, y: number
}[];
if (typeof window !== 'undefined') {
  accessibility(Highcharts);
}
const genOptions = (data: ChartDataType, title: string) => ({
  chart: {
    type: 'column',
    events: {
      load: () => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
        const chart : any = this;
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (chart && typeof chart !== 'undefined' && chart.series) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            chart.reflow();
          }
        }, 0);
      },
    },
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
      data,
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
  accessibility: {
    keyboardNavigation: {
      enabled: true,
      focusBorder: {
        enabled: true,
        hideBrowserFocusOutline: true,
        margin: 2,
        style: {
          borderRadius: 3,
          color: '#335cad',
          lineWidth: 2,
        },
      },
    },
  },
});

const generateOptionsForDateVisual = (data: GroupByDayType[]) => {
  const chartData: ChartDataType = [];
  data.forEach((dateGroup:GroupByDayType) => {
    chartData.push({
      name: dateGroup.date,
      y: dateGroup.transactions.length,
    });
  });
  return genOptions(chartData, 'Number of transactions by date');
};

const generateOptionsForTypeVisual = (data: TransactionType[]) => {
  const chartData : ChartDataType = [{
    name: 'DEBIT', y: 0,
  }, { name: 'CREDIT', y: 0 }];
  data.forEach((transaction) => {
    if (transaction.debitCreditCode === 'DEBIT') {
      chartData[0].y += 1;
    } else if (transaction.debitCreditCode === 'CREDIT') {
      chartData[1].y += 1;
    }
  });
  return genOptions(chartData, 'Total debits & credits');
};

function TransactionViz({ transactions, groupedByDay } : TransactionVisProps) {
  return (
    <div className="flex p-6 rounded-lg border mb-4 shadow-sm gap-2 h-60 flex-row">
      <HighchartsReact
        highcharts={Highcharts}
        options={generateOptionsForDateVisual(groupedByDay)}
        containerProps={{
          className: 'highcharts-container',
          style: { height: '100%' },
        }}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={generateOptionsForTypeVisual(transactions)}
        containerProps={{
          className: 'highcharts-container',
          style: { height: '100%' },
        }}
      />
    </div>
  );
}

export default TransactionViz;
