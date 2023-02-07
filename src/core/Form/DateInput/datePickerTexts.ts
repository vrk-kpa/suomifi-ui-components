export const languages = ['fi', 'en', 'sv'] as const;

export type Language = typeof languages[number];

export const defaultLanguage: Language = 'fi';

export interface DatePickerTextProps {
  /** Aria-label for calendar button that opens the date picker. */
  openButtonLabel?: string;
  /** Aria label for indicating date selection in selected cell and calendar open button. */
  selectedDateLabel?: string;
  /** Text for close button. */
  closeButtonText?: string;
  /** Text for date selection button. */
  selectButtonText?: string;
  /** Aria-label for year select. */
  yearSelectLabel?: string;
  /** Aria-label for month select. */
  monthSelectLabel?: string;
  /** Aria-label for moving to next month. */
  nextMonthButtonLabel?: string;
  /** Aria-label for moving to previous month. */
  prevMonthButtonLabel?: string;
  /** Month names for month select element. */
  monthNames?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  /* Week names for screen reader. */
  weekDays?: [string, string, string, string, string, string, string];
  /* Week name abbreviations that appear in calendar's head row. */
  weekDayAbbreviations?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}

export type InternalDatePickerTextProps = Required<DatePickerTextProps>;

export const datePickerDefaultTexts: {
  en: InternalDatePickerTextProps;
  fi: InternalDatePickerTextProps;
  sv: InternalDatePickerTextProps;
} = {
  en: {
    openButtonLabel: 'Choose date',
    selectedDateLabel: 'Selected date',
    closeButtonText: 'Close',
    selectButtonText: 'Select',
    yearSelectLabel: 'Select year',
    monthSelectLabel: 'Select month',
    nextMonthButtonLabel: 'Next month',
    prevMonthButtonLabel: 'Previous month',
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekDays: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    weekDayAbbreviations: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  fi: {
    openButtonLabel: 'Valitse päivämäärä',
    selectedDateLabel: 'Valittu päivä',
    closeButtonText: 'Sulje',
    selectButtonText: 'Valitse',
    yearSelectLabel: 'Valitse vuosi',
    monthSelectLabel: 'Valitse kuukausi',
    nextMonthButtonLabel: 'Seuraava kuukausi',
    prevMonthButtonLabel: 'Edellinen kuukausi',
    monthNames: [
      'Tammikuu',
      'Helmikuu',
      'Maaliskuu',
      'Huhtikuu',
      'Toukokuu',
      'Kesäkuu',
      'Heinäkuu',
      'Elokuu',
      'Syyskuu',
      'Lokakuu',
      'Marraskuu',
      'Joulukuu',
    ],
    weekDays: [
      'maanantai',
      'tiistai',
      'keskiviikko',
      'torstai',
      'perjantai',
      'lauantai',
      'sunnuntai',
    ],
    weekDayAbbreviations: ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'],
  },
  sv: {
    openButtonLabel: 'Välj datum',
    selectedDateLabel: 'Valt datum',
    closeButtonText: 'Stäng',
    selectButtonText: 'Välj',
    yearSelectLabel: 'Välj år',
    monthSelectLabel: 'Välj månad',
    nextMonthButtonLabel: 'Nästa månad',
    prevMonthButtonLabel: 'Föregående månad',
    monthNames: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    weekDays: [
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag',
      'Söndag',
    ],
    weekDayAbbreviations: ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'],
  },
};
