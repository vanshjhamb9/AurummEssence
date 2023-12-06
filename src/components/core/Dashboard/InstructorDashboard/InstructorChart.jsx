import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    }
    

    //create options
    const options = {

    };


  return (
    <div className='p-7'>
      <p className='text-[20px] text-richblack-5 font-semibold'>Visualise</p>
      <div className='flex gap-x-5 p-[10px]'>
        <button
        className={`w-[110px] h-[38px] rounded-lg ${currChart=="students" ?   "text-yellow-50 text-[18px] bg-richblack-600" : " text-[18px]" }`}
        onClick={() => setCurrChart("students")}
        >
            Student
        </button>

        <button
         className={`w-[120px] h-[38px] rounded-lg ${currChart=="income" ?   "text-yellow-50 text-[18px] bg-richblack-600" : " text-[18px]" }`}
        onClick={() => setCurrChart("income")}
        >
            Income
        </button>
      </div>
      <div className='md:w-[400px] sm:[300px] mx-auto flex '>
        <Pie 
        className='flex flex-col '
            data={currChart === "students" ? (chartDataForStudents) : (chartDataForIncome)}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
