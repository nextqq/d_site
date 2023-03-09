import {BaseApp} from "../base.js";
//
// let calendarApp = document.querySelector('.calendarApp')
//
// const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
//
// function isLeapYear(year){
//     return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
// }
//
// function getFebDays (year){
//     return isLeapYear(year) ? 29 : 28
// }
//
// function generateCalendar(month, year){
//
//     let calendar_days = calendarApp.querySelector('.calendarApp-days')
//     let calendar_header_year = calendarApp.querySelector('#year')
//
//     let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//
//     calendar_days.innerHTML = ''
//
//     let currDate = new Date()
//     if (!month && month !== 0) month = currDate.getMonth()
//     if (!year) year = currDate.getFullYear()
//
//     let curr_month = `${month_names[month]}`
//     month_picker.innerHTML = curr_month
//     calendar_header_year.innerHTML = year
//
//     // get first day of month
//
//     let first_day = new Date(year, month, 1)
//
//     for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
//         let day = document.createElement('div')
//         if (i >= first_day.getDay()) {
//             day.classList.add('calendarApp-day-hover')
//             day.innerHTML = i - first_day.getDay() + 1
//             day.innerHTML += `<span></span>
//                             <span></span>
//                             <span></span>
//                             <span></span>`
//             if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//                 day.classList.add('curr-date')
//             }
//         }
//         calendar_days.appendChild(day)
//     }
// }
//
// let month_list = calendarApp.querySelector('.month-list')
//
// month_names.forEach((e, index) => {
//     let month = document.createElement('div')
//     month.innerHTML = `<div data-month="${index}">${e}</div>`
//     month.querySelector('div').onclick = () => {
//         month_list.classList.remove('show')
//         curr_month.value = index
//         generateCalendar(index, curr_year.value)
//     }
//     month_list.appendChild(month)
// })
//
// let month_picker = calendarApp.querySelector('#month-picker')
//
// month_picker.onclick = () => {
//     month_list.classList.add('show')
// }
//
// let currDate = new Date()
//
// let curr_month = {value: currDate.getMonth()}
// let curr_year = {value: currDate.getFullYear()}
//
// generateCalendar(curr_month.value, curr_year.value)
//
// document.querySelector('#prev-year').onclick = () => {
//     --curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }
//
// document.querySelector('#next-year').onclick = () => {
//     ++curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
let calendar = document.querySelector('.calendar')

function isLeapYear (year)  {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

function getFebDays (year)  {
    return isLeapYear(year) ? 29 : 28
}


let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}





export class CalendarApp extends BaseApp{
    name = 'Календарь';
    icon = 'calendar-outline';
    template_id = 'CalendarApp';
    month_names = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];
    urlpatterns = {
        '/main/calendar/': this.home
    };

    async home(self){
        self.open();
    }

    generateCalendar  (month, year) {

        let calendar_days = calendar.querySelector('.calendar-days')
        let calendar_header_year = calendar.querySelector('#year')
        let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        calendar_days.innerHTML = ''

        let currDate = new Date()
        if (!month && month !== 0) month = currDate.getMonth()
        if (!year) year = currDate.getFullYear()

        let curr_month = `${month_names[month]}`
        month_picker.innerHTML = curr_month
        calendar_header_year.innerHTML = year

        let first_day = new Date(year, month, 1)

        for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
            let day = document.createElement('div')
            if (i >= first_day.getDay()) {
                day.classList.add('calendar-day-hover')
                day.innerHTML = i - first_day.getDay() + 1
                day.innerHTML += `<span></span>
                                <span></span>
                                <span></span>
                                <span></span>`
                if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                    day.classList.add('curr-date')
                }
            }
            calendar_days.appendChild(day)
        }
    }
    init_calendar_widget(){
        let self = this;
        document.querySelector('#prev-year').onclick = () => {
            --curr_year.value
            self.generateCalendar(curr_month.value, curr_year.value)
        }

        document.querySelector('#next-year').onclick = () => {
            ++curr_year.value
            self.generateCalendar(curr_month.value, curr_year.value)
        }

        self.generateCalendar(curr_month.value, curr_year.value)

    }


    constructor() {
        super();
        this.init_calendar_widget()

    }

    call_open() {
        // let div = document.createElement('div')
        // let template_element = document.getElementById('page-calendar-template-id').innerHTML;
        // let data = {
        //     month_picker: '123',
        // }
        //
        // div.innerHTML = _.template(template_element)(data)

    }
}