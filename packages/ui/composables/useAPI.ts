import { useNotificationsStore } from '../stores/notifications'
import { APIOptions, APIResponse, APIStatus, Severity } from '~~/definitions'

export const useAPI = () => {
  const { addNotification } = useNotificationsStore()
  const getSafeAPIResponse = async <T>(request: Promise<unknown>, customOptions?: APIOptions): Promise<APIResponse<T>> => {
    const options: APIOptions = {
      transform: customOptions?.transform ?? true,
      transformerOptions: customOptions?.transformerOptions,
    }
    try {
      const response = await request
      if (options.transform) {
        const { transformResponse } = useTransformer()
        return {
          ok: true,
          status: APIStatus.Ok,
          result: transformResponse<T>(response, options.transformerOptions),
        }
      }
      return {
        ok: true,
        status: APIStatus.Ok,
        result: response as T,
      }
    } catch (err: any) {
      if (err.error.status === APIStatus.BadRequest && err.error.message && addNotification) {
        addNotification({ life: 7000, severity: Severity.Error, summary: 'error', detail: err.error.message })
      }
      return {
        ok: false,
        status: err.error.status as APIStatus,
        result: null as unknown as T,
      }
    }
  }

  return { getSafeAPIResponse }
}
