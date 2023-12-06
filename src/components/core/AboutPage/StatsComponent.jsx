import React from 'react'

const Stats = [
  {count: "5K+", label:"Active Consumers"},
  {count: "60+", label:"Products"},
  {count: "50+", label:"Awards"}
]
const StatsComponent = () => {
  return (
    <section>
      <div>
        <div className='flex gap-6'>
          {
            Stats.map( (data,index) => {
              return (
                <div key={index}>
                  <h1>{data.count}</h1>
                  <h2>{data.label} </h2>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponent
