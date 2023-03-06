import Chart, { GoogleChartWrapperChartType } from 'react-google-charts';

type Props = {
  passedData: any;
  passedOptions: any;
  chartName: GoogleChartWrapperChartType;
};

const Figure = (prop: Props) => {
  return (
    <Chart
      chartType={prop.chartName}
      width="100%"
      // height={heightInVmString}
      data={prop.passedData}
      options={prop.passedOptions}
    />
  )
}

export default Figure