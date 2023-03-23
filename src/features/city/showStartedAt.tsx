import dayjs from 'dayjs'

export const showStartedAt = (startedAt: string) => {
  return dayjs(startedAt).format('YYYY年MM月DD')
}
