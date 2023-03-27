import { GroupBase } from 'react-select'
import ReactSelect, { CreatableProps } from 'react-select/creatable'

type Props<T> = CreatableProps<T, true, GroupBase<T>>

export const MultiSelect = <T,>(props: Props<T>) => {
  return (
    <ReactSelect
      placeholder="選択してください"
      noOptionsMessage={() => <>検索結果はありません</>}
      isMulti
      isClearable
      isSearchable
      {...props}
    />
  )
}
