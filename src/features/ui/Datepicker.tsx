import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ja', ja)

type Props = Omit<ReactDatePickerProps, 'locale'>

export const Datepicker: React.FC<Props> = (props) => {
  return <ReactDatePicker locale={ja} {...props} />
}
