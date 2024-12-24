import request from '../../configs/request'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginData:{username:string, password:string}) =>
      request.post('auth/login', loginData).then((res) => res.data),
  })
}
