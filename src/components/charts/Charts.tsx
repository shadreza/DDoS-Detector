import Chart, { GoogleChartWrapperChartType } from 'react-google-charts';

type Props = {
  passedData: any;
  passedOptions: any;
  title: string;
  chartName: GoogleChartWrapperChartType;
};


const Charts = (prop: Props) => {


  return (
    <>
      {
        prop.chartName && 
          <div className="mt-6 max-w-full mb-6 bg-indigo-300 p-2 rounded-xl overflow-x-auto">
            <span className='z-100 font-bold text-orange-700'>{prop.title}</span>
            <div className="bg-rose-50 p-2 mt-2 w-fit sm:w-full rounded-xl">
              <div className="flex justify-center items-center p-2 w-fit sm:w-full">
                <Chart
                  chartType={prop.chartName}
                  width="100%"
                  data={prop.passedData}
                  options={prop.passedOptions}
                />
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Charts