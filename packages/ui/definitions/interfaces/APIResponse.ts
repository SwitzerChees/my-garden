import { APIStatus } from '../enums'

interface APIResponse<T> {
  ok: boolean
  status: APIStatus
  result: T
}

export { APIResponse }
