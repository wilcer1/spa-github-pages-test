import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  IconButton,
  Grid,
  makeStyles,
  Card,
  Button,
  Popover,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import Popup from 'reactjs-popup';
import '../style/Calendar.css';
import VerifyBooking from './verifyBooking';

const CalendarTemplate = ({
  availability,
  setAvailability,
  primaryColor = '#DF1B1B',
  secondaryColor = '#47b2a2',
  fontFamily = 'Roboto',
  fontSize = 12,
  primaryFontColor = '#222222',
  startTime = '8:00',
  endTime = '20:00',
}) => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: `${fontFamily}`,
      fontSize: fontSize,
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      text: {
        primary: primaryFontColor,
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    calendar: {
      fontFamily: theme.typography.fontFamily,
    },
    calendarText: {
      margin: 0,
      width: 25,
      height: 25,
      textAlign: 'center',
    },
    button: {
      minWidth: 200,
      margin: 10,
      fontFamily: theme.typography.fontFamily,
    },
    buttonNoMargin: {
      minWidth: 200,
      fontFamily: theme.typography.fontFamily,
    },
    popover: {
      pointerEvents: 'none',
      fontFamily: theme.typography.fontFamily,
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));

  const useMonths = (year) => ({
    1: {
      lastDay: 31,
      month: 'January',
      firstDay: moment(`01/01/${year}`),
    },
    2: {
      lastDay: year % 4 === 0 ? 29 : 28,
      month: 'February',
      firstDay: moment(`02/01/${year}`),
    },
    3: {
      lastDay: 31,
      month: 'March',
      firstDay: moment(`03/01/${year}`),
    },
    4: {
      lastDay: 30,
      month: 'April',
      firstDay: moment(`04/01/${year}`),
    },
    5: {
      lastDay: 31,
      month: 'May',
      firstDay: moment(`05/01/${year}`),
    },
    6: {
      lastDay: 30,
      month: 'June',
      firstDay: moment(`06/01/${year}`),
    },
    7: {
      lastDay: 31,
      month: 'July',
      firstDay: moment(`07/01/${year}`),
    },
    8: {
      lastDay: 31,
      month: 'August',
      firstDay: moment(`08/01/${year}`),
    },
    9: {
      lastDay: 30,
      month: 'September',
      firstDay: moment(`09/01/${year}`),
    },
    10: {
      lastDay: 31,
      month: 'October',
      firstDay: moment(`10/01/${year}`),
    },
    11: {
      lastDay: 30,
      month: 'November',
      firstDay: moment(`11/01/${year}`),
    },
    12: {
      lastDay: 31,
      month: 'December',
      firstDay: moment(`12/01/${year}`),
    },
  });

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  function TimeButton({ className, time, available, handleClick }) {
    return (
      <Button
        onClick={handleClick}
        color={available ? 'primary' : 'default'}
        className={className}
        variant={available ? 'contained' : 'outlined'}
      >
        {time.time}
      </Button>
    );
  }

  function Popupfunc({ classname, open, close, activeDay, timeSelected }) {
    if (true) {
      return (
        <Popup
          className={classname}
          open={open}
          closeOnDocumentClick
          onClose={close}
        >
          <div className="popUp">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Time booked:</div>
            <div className="content">
              {activeDay} <br></br> {timeSelected}
              <VerifyBooking />
            </div>
          </div>
        </Popup>
      );
    } else {
      return <h1>Hey</h1>;
    }
  }

  function getDaysArray() {
    return [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
  }

  function fillDayAvailable(date) {
    for (let i = 10; i < 20; i++) {
      fetch('/api/setAvailable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ datetime: date + `_${i}:00-${i + 1}:00` }),
      })
        .then((res) => res.text())
        .then((response) => {
          console.log(response);
        });
    }
  }

  const convertAvailabilityForDatabase = (availability) => {
    const output = [];
    for (let year in availability) {
      for (let month in availability[year]) {
        for (let day in availability[year][month]) {
          let activeDay = availability[year][month][day];
          addActiveDayToOutput(activeDay, output, month, day, year);
        }
      }
    }
    return output;
  };

  const combineTimeArrays = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      a[i].available = a[i].available || b[i].available;
    }
    return a;
  };
  function addActiveDayToOutput(activeDay, output, month, day, year) {
    let activeRangeStart = null;
    for (let time of activeDay) {
      if (time.available && !activeRangeStart) activeRangeStart = time.time;
      else if (!time.available && activeRangeStart) {
        output.push({
          start: new Date(`${month} ${day} ${year} ${activeRangeStart}`),
          end: new Date(`${month} ${day} ${year} ${time.time}`),
        });
        activeRangeStart = null;
      }
    }
  }

  function makeQuickAvailability(availability) {
    const output = {};
    for (let range of availability) {
      if (new Date(range.start) > new Date()) {
        let day = moment(range.start).format('MMMM D, YYYY');
        let time = `${moment(range.start).format('H:mm')} - ${moment(
          range.end,
        ).format('H:mm')}`;
        if (output[day]) {
          output[day].push(time);
        } else {
          output[day] = [time];
        }
      }
    }
    return output;
  }
  return function Calendar() {
    const classes = useStyles();
    const today = moment();

    const [activeDay, setActiveDay] = useState(formatDate(today._d));
    const [year, setYear] = useState(Number(today.format('YYYY')));
    const [monthNumber, setMonthNumber] = useState(Number(today.format('M')));
    const months = useMonths(year);
    const { firstDay, month, lastDay } = months[monthNumber];
    let dayOfWeek = Number(moment(firstDay).format('d'));
    const days = getDaysArray();
    const [times, setTimes] = useState([]);
    const [saving, setSaving] = useState(false);
    const [timeSelected, setTimeSelected] = useState(null);
    const [openPop, setOpenPop] = useState(false);
    const closeModal = () => setOpenPop(false);
    let week = 0;
    let dayOfMonth = 1;
    while (week < 6 && dayOfMonth <= lastDay) {
      days[week][dayOfWeek] = dayOfMonth;
      dayOfMonth++;
      dayOfWeek++;
      if (dayOfWeek === 7) {
        week++;
        dayOfWeek = 0;
      }
    }

    useEffect(() => {
      fetch(
        `https://data.mongodb-api.com/app/website-mamma-fvnxm/endpoint/getAvailableForDate?date=${activeDay}`,
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          response = formatDateTime(response);
          response.map((element) => {
            element.available = false;
          });

          setTimes(response);
        });
    }, [activeDay]);

    function formatDateTime(json) {
      const datetimeformatted = [];
      json.map((element) => {
        var temp = element.datetime.split('_');
        datetimeformatted.push({
          date: temp[0],
          time: temp[1],
        });
      });
      return datetimeformatted;
    }

    const createArrowHandler = (delta) => () => {
      let newMonth = monthNumber + delta;
      if (newMonth > 12) {
        setYear(year + 1);
        newMonth = 1;
      } else if (newMonth < 1) {
        setYear(year - 1);
        newMonth = 12;
      }
      setActiveDay(null);
      setTimes([]);
      setTimeSelected(null);
      setMonthNumber(newMonth);
    };

    function saveBooking(datetime) {
      fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ datetime: datetime }),
      })
        .then((res) => res.text())
        .then((response) => {
          console.log(response);
        });
    }

    const monthsSV = (month) => {
      switch (month) {
        case 'January':
          return 'Januari';

        case 'February':
          return 'Februari';

        case 'March':
          return 'Mars';

        case 'April':
          return 'April';

        case 'May':
          return 'Maj';

        case 'June':
          return 'Juni';

        case 'July':
          return 'Juli';

        case 'August':
          return 'Augusti';

        case 'September':
          return 'September';

        case 'October':
          return 'Oktober';

        case 'November':
          return 'November';

        case 'December':
          return 'December';

        default:
          return month;
      }
    };
    const getDay = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];

    const handleJumpToCurrent = () => {
      setYear(Number(today.format('YYYY')));
      setMonthNumber(Number(today.format('M')));
      setActiveDay(null);
      setTimes([]);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);

    const handleClosePopover = () => {
      setAnchorEl(null);
      setPopoverContent(null);
    };

    function timeButtonClicked(i) {
      if (timeSelected == null) {
        times[i].available = !times[i].available;
        setTimeSelected(times[i].time);
      } else if (times[i].available) {
        times[i].available = !times[i].available;
        setTimeSelected(null);
      } else {
        times.map((element, z) => {
          times[z].available = false;
        });
        times[i].available = true;
        setTimeSelected(times[i].time);
      }
    }

    const monthsLong = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    return (
      <ThemeProvider theme={theme}>
        <Grid
          className={classes.calendar}
          container
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <IconButton
                  disabled={
                    year === Number(today.format('YYYY')) &&
                    month === today.format('MMMM')
                  }
                  onClick={createArrowHandler(-1)}
                >
                  <ArrowLeft />
                </IconButton>
              </Grid>
              <Grid item>
                <Card style={{ padding: 10, margin: 10 }} variant="outlined">
                  <Grid container direction="column" alignItems="center">
                    <h3>
                      {monthsSV(month)} {year}
                    </h3>

                    <Grid key="weekdays" item>
                      <Grid container direction="row">
                        {getDay.map((day, i) => (
                          <Grid key={day} item>
                            <IconButton
                              color="primary"
                              disabled={true}
                              size="medium"
                            >
                              <p
                                className={classes.calendarText}
                                style={{ textAlign: 'left', fontSize: 13 }}
                              >
                                {day}
                              </p>
                            </IconButton>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {days.map((week, i) => (
                      <Grid key={i} item>
                        <Grid container direction="row">
                          {week.map((day, i) => (
                            <Grid key={year + month + i} item>
                              <IconButton
                                onClick={() => {
                                  setActiveDay(
                                    day + '/' + monthsLong[month] + '/' + year,
                                  );
                                  setTimeSelected(null);
                                }}
                                color={
                                  activeDay ===
                                  day + '/' + monthsLong[month] + '/' + year
                                    ? 'primary'
                                    : 'secondary'
                                }
                                disabled={
                                  !day ||
                                  (year === Number(today.format('YYYY')) &&
                                    month === today.format('MMMM') &&
                                    day < Number(today.format('D')))
                                }
                                size="medium"
                                onMouseLeave={handleClosePopover}
                              >
                                <p className={classes.calendarText}>{day}</p>
                              </IconButton>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    ))}
                    <Popover
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      className={classes.popover}
                      classes={{ paper: classes.paper }}
                      anchorEl={anchorEl}
                      open={!!anchorEl}
                    >
                      {popoverContent}
                    </Popover>
                    <Button
                      disabled={
                        year === Number(today.format('YYYY')) &&
                        month === today.format('MMMM')
                      }
                      onClick={handleJumpToCurrent}
                      className={classes.buttonNoMargin}
                    >
                      Hoppa till nuvarande månad
                    </Button>
                  </Grid>
                </Card>
              </Grid>
              <Grid item>
                <IconButton onClick={createArrowHandler(1)}>
                  <ArrowRight />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  wrap="wrap"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      wrap="wrap"
                    >
                      {times.map(
                        (time, i) =>
                          i < Math.ceil(times.length / 2) && (
                            <TimeButton
                              key={time.time.concat(time.date)}
                              className={classes.button}
                              time={time}
                              handleClick={() => {
                                timeButtonClicked(i);
                              }}
                              available={time.available}
                            />
                          ),
                      )}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      wrap="wrap"
                    >
                      {times.map(
                        (time, i) =>
                          i < times.length &&
                          i > Math.ceil(times.length / 2) - 1 && (
                            <TimeButton
                              key={time.time.concat(time.date)}
                              className={classes.button}
                              time={time}
                              handleClick={() => {
                                timeButtonClicked(i);
                              }}
                              available={time.available}
                            />
                          ),
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setOpenPop(true);
                    // saveBooking(`${activeDay}_${timeSelected}`);
                  }}
                  className={classes.button}
                >
                  Boka
                </Button>

                <Popupfunc
                  classname="popUp"
                  open={openPop}
                  close={closeModal}
                  activeDay={activeDay}
                  timeSelected={timeSelected}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };
};

export default CalendarTemplate;
