import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'

import 'react-datepicker/dist/react-datepicker.css'
import { Input } from './Input'

registerLocale('ja', ja)

type Props = Omit<ReactDatePickerProps, 'locale'>

export const Datepicker: React.FC<Props> = (props) => {
  return (
    <ReactDatePicker
      locale={ja}
      placeholderText="年/月/日"
      dateFormat="yyyy/MM/dd"
      customInput={<Input />}
      {...props}
    />
  )
}
