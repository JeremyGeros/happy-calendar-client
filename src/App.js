import React, { Component } from 'react';
import { DateTime } from 'luxon';
import classnames from 'classnames';

import './App.css';


function calendarDaysForDate(date) {
  const monthStart = date.startOf('month');
  const startingWeekday = monthStart.weekday;
  let startFrom;
  if (startingWeekday > 1) {
      startFrom = monthStart.minus({days: startingWeekday - 1})
  } else {
      startFrom = monthStart;
  }

  return Array.from({length: 42}).map((_, i) => startFrom.plus({days: i}));
}

function weekDaysForDate(date) {
  return Array.from({length: 6}).map((_, i) => date.plus({days: i}));
}

const data = [
  {
    time: 11,
    name: 'Meeting',
    type: 'date',
  },
  {
    time: 12,
    name: 'Dentist',
    type: 'date',
  },
  {
    time: 22,
    name: 'Go to supermarket',
    complete: true,
    type: 'task',
  },
  {
    time: 16,
    name: 'Make food',
    type: 'date',
  },
  {
    time: 18,
    name: 'Shop for present',
    compelete: false,
    type: 'task',
  },
]

// <div className='calendar'>
//           <div className='calendar-header'>
//             <h1>{date.toLocaleString({month: 'long'})}</h1>
//             <div className='calendar-weekdays'>
//               <div className="calendar-weekday">Mon</div>
//               <div className="calendar-weekday">Tue</div>
//               <div className="calendar-weekday">Wed</div>
//               <div className="calendar-weekday">Thu</div>
//               <div className="calendar-weekday">Fri</div>
//               <div className="calendar-weekday">Sat</div>
//               <div className="calendar-weekday">Sun</div>
//             </div>
//           </div>
//           <div className='calendar-days'>
//             {dayCells}
//           </div>
//         </div>

class App extends Component {

  todayList(items) {
    return items.map((item) => {
      let statusColumn;
      if (item.type === 'task') {
        statusColumn = <span className="checkbox"><i className={`${item.complete ? 'fas fa-check-square' :'far fa-square'}`}></i></span>
      }

      return (<li key={Math.random()} className={`${item.complete ? 'completed' : ''} ${item.type}`}>
        
        <div className="name">{statusColumn}{item.name}</div>
      </li>);
    });
  }

  firstList(items) {
    return items.map((item) => {
      return (<li key={Math.random()} style={{gridRowStart: item.time + 1 }}>
        <div className="name">{item.name}</div>
      </li>);
    });
  }

  render() {
    const date = DateTime.local();
    const now = DateTime.local();
    const days = calendarDaysForDate(date);
    // const dayCells = days.map((day) => {
    //   const weekday = day.toLocaleString({weekday: 'short'}).toLowerCase();

    //   const cellClasses = classnames({
    //     day: true,
    //     [`day-${weekday}`]: true,
    //     'day-today' : day.hasSame(now, 'day'),
    //     'day-current-month': day.hasSame(date, 'month'),
    //   })

    //   return (<div key={day.toLocaleString()} className={cellClasses} data-day={day.toLocaleString({ day: 'numeric' })}></div>);
    // });

    const weekdays = weekDaysForDate(date);
    const weekdayCells = weekdays.map((day, index) => {
      const weekday = day.toLocaleString({weekday: 'short'}).toLowerCase();

      const cellClasses = classnames({
        day: true,
        [`day-${weekday}`]: true,
        'day-current-month': true,
        'day-today': index === 0,
      })

      let today;
      if (index === 0) {
        today = (<ul className="today day-list">
          {this.firstList(data)}
        </ul>);
      }

      const hours = <div className='day-hours'>
        {Array.from({length: 24}).map((_, i) => <div key={i}></div>)}
      </div>

      return (<div key={day.toLocaleString()} className={cellClasses}>
        <div className="day-content">
          {today}
          {hours}
        </div>
      </div>);
    });

    const weekdayHeaders = weekdays.map((day, index) => {
      const weekday = day.toLocaleString({weekday: 'short'}).toLowerCase();

      const cellClasses = classnames({
        day: true,
        [`day-${weekday}`]: true,
        'day-current-month': true,
        'day-today': index === 0,
        'day-header': true,
      })

      const name = day.toLocaleString({ weekday: 'short', day: 'numeric' });

      return (<div key={day.toLocaleString()} className={cellClasses}>
        {name}
      </div>);
    });

  

    return (
      <main>
        <header>
          <a href="/" className="logo">
            <svg width="30" height="30" viewBox="0 0 510 512">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="sunny">
                        <path d="M506.834,301.608 L452.065,253.296 L504.897,202.897 C506.838,201.045 507.637,198.306 506.996,195.708 C506.354,193.111 504.367,191.053 501.785,190.307 L431.469,170.015 L457.457,101.959 C458.412,99.459 457.952,96.643 456.253,94.57 C454.553,92.498 451.87,91.485 449.215,91.913 L376.941,103.565 L371.063,31.004 C370.847,28.338 369.217,25.989 366.788,24.843 C364.359,23.697 361.497,23.926 359.284,25.444 L299.018,66.786 L262.409,3.742 C261.064,1.426 258.579,0 255.889,0 C253.199,0 250.715,1.426 249.37,3.742 L207.347,76.11 L134.657,34.157 C132.33,32.814 129.46,32.808 127.129,34.139 C124.796,35.47 123.356,37.938 123.349,40.612 L123.173,113.407 L50.208,107.393 C47.533,107.173 44.933,108.39 43.401,110.587 C41.868,112.784 41.63,115.628 42.779,118.046 L74.021,183.881 L5.508,209.562 C2.992,210.505 1.173,212.712 0.735,215.351 C0.297,217.989 1.31,220.659 3.391,222.354 L60.01,268.506 L9.197,320.916 C7.331,322.841 6.638,325.61 7.381,328.18 C8.125,330.75 10.191,332.73 12.8,333.374 L83.855,350.925 L60.56,419.936 C59.704,422.471 60.274,425.267 62.054,427.272 C63.835,429.277 66.556,430.185 69.191,429.654 L140.951,415.211 L149.672,487.489 C149.991,490.144 151.713,492.427 154.185,493.479 C156.659,494.531 159.508,494.191 161.66,492.588 L220.256,448.941 L259.311,508.507 C260.693,510.686 263.1,511.999 265.678,511.999 C265.776,511.999 265.874,511.997 265.973,511.993 C268.66,511.889 271.088,510.367 272.341,508.001 L306.448,445.596 L368.287,484.57 C370.56,486.002 373.424,486.12 375.809,484.88 C378.191,483.64 379.728,481.23 379.839,478.558 L382.87,405.824 L455.544,414.664 C458.208,414.988 460.854,413.873 462.472,411.737 C464.09,409.6 464.438,406.768 463.386,404.307 L434.75,337.31 L504.215,314.307 C506.767,313.462 508.671,311.328 509.212,308.708 C509.752,306.09 508.845,303.383 506.834,301.608 Z" id="Path" fill="#FFA600"></path>
                        <ellipse id="Oval" fill="#FFDB2D" cx="253.35" cy="254.691" rx="155.069" ry="154.949"></ellipse>
                        <path d="M253.354,99.743 C249.47,99.743 245.622,99.89 241.811,100.171 C322.061,106.072 385.336,172.996 385.336,254.692 C385.336,336.387 322.061,403.311 241.811,409.213 C245.622,409.493 249.471,409.641 253.354,409.641 C338.995,409.641 408.422,340.268 408.422,254.693 C408.422,169.116 338.995,99.743 253.354,99.743 Z" id="Path" fill="#FFCA00"></path>
                    </g>
                </g>
            </svg>
          </a>

          <div className="date-selector">
            <i className="fal fa-chevron-left"></i>
            {weekdays[0].toLocaleString({day: 'numeric', month: 'short'})}
            {' '}-{' '}
            {weekdays[weekdays.length - 1].toLocaleString({day: 'numeric', month: 'short', year: 'numeric'})}
            <i className="fal fa-chevron-right"></i>
          </div>

          <button>
            Today
          </button>

        </header>
        <div className="calendar">
          <div className='day-headers'>
            
            <div className='tasks-header day-header today'>
              Today
            </div>
            <div className='hours-header day-header day'>
      
            </div>
            {weekdayHeaders}
          </div>
          <div className='day-cells'>
          
            <div className='tasks'>
              <ul className="today day-list">
                {this.todayList(data)}
              </ul>
            </div>
            <div className='hours-sidebar'>
              {Array.from({length: 24}).map((_, i) => <div key={i}>{i}:00</div>)}
            </div>
            {weekdayCells}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
