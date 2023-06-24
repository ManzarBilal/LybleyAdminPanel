import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function TopShellingProductChart(props) {

    const [series, setSeries] = useState([      
   ])
 
  useEffect(()=>{
        let count={};
        let obj=props?.orders?.map(o1=> {
           let date=new Date(o1?.createdAt);
           let date1=(date.getMonth()+1);
           if(count[date1]){
            count[date1].order++;
           }else{
            count[date1]={month:date1,order:1};
           }
        })
    
     let branch=Object?.values(count);
        
      let data1=[];
     let obj1=[1,2,3,4,5,6,7,8,9,10,11,12].map((o1,i)=>{
          let mon=branch?.find(f1=>f1?.month===o1); 
          if(mon){
            data1?.splice(o1,0,mon?.order);
          }else{
            data1?.splice(o1,0,0);
          }
      })
       setSeries([{name:"Orders",data:data1}]);
     },[props?.orders])
    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
   
        xaxis: {
            categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        legend: {
            position: 'top', // top, bottom
            horizontalAlign: 'right', // left, right
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['var(--chart-color1)', 'var(--chart-color2)', 'var(--chart-color3)', 'var(--chart-color4)'],
    })
//eslint-disable-next-line

   
    return (
        <div className="card ">
            <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                <h6 className="m-0 fw-bold">Orders</h6>
            </div>
            <div className="card-body" style={{ position: 'relative' }}>
                <Chart
                    options={options}
                    series={series}
                    type='bar'
                    width='100%'
                    height={300}
                />
            </div>
        </div>
    )
}
export default TopShellingProductChart;