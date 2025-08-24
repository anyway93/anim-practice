import { Calendar } from 'vanilla-calendar-pro'
import type { Options } from 'vanilla-calendar-pro'
import 'vanilla-calendar-pro/styles/index.css'

import { inputmaskDateInit } from '@shared/scripts/libs/inputmask/inputmask'

export default function calendarInit(): void {
  const inputField = document.getElementById('uiCalendar') as HTMLInputElement | null
  const calendarContainer = document.getElementById('calendar') as HTMLElement | null

  if (!inputField || !calendarContainer) return

  const isFixed = calendarContainer.dataset.fixed?.toString() === 'true'

  const options: Options = {
    type: 'default',
    enableJumpToSelectedDate: true,
    firstWeekday: 1,
    locale: {
      months: {
        short: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        long: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      },
      weekdays: {
        short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
      }
    },
    onClickDate: (self) => {
      const selectedDate = self.context.selectedDates[0]
      if (selectedDate) {
        inputField.value = formatDate(new Date(selectedDate))
        if (!isFixed) calendar.hide()
      }
    },
  }

  const calendar = new Calendar(calendarContainer, options)
  calendar.init()

  const originalShow = calendar.show.bind(calendar)
  const originalHide = calendar.hide.bind(calendar)

  calendar.show = () => {
    calendarContainer.style.display = ''
    originalShow()
  }

  calendar.hide = () => {
    originalHide()
    calendarContainer.style.display = 'none'
  }

  if (!isFixed) {
    calendar.hide()
  }

  inputmaskDateInit()

  inputField.addEventListener('change', () => {
    const parsedDate = parseDate(inputField.value)
    if (parsedDate) {
      calendar.selectedDates = [parsedDate.toISOString().split('T')[0]]
      calendar.update()
    }
  })

  if (!isFixed) {
    inputField.addEventListener('click', () => {
      calendar.show()
    })

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement

      setTimeout(() => {
        const isInsideInput = inputField.contains(document.activeElement)
        const isInsideCalendar = calendarContainer.contains(document.activeElement)
        const isClickedInside = inputField.contains(target) || calendarContainer.contains(target)

        if (!isInsideInput && !isInsideCalendar && !isClickedInside) {
          calendar.hide()
        }
      }, 0)
    })
  }

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  function parseDate(dateString: string): Date | null {
    const parts = dateString.split('.')
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number)
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month - 1, day)
      }
    }
    return null
  }
}
