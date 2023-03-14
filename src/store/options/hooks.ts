import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../index'
import { updatedOptionsInvitedAddress } from './actions'

export function useOptionsInvitedAddress(): [string, (address: string) => void] {
  const dispatch = useAppDispatch()
  const optionsInvitedAddress = useSelector<AppState, AppState['options']['optionsInvitedAddress']>((state) => {
    return state.options.optionsInvitedAddress
  })

  const setOptionsInvitedAddress = useCallback(
    (address: string) => {
      dispatch(updatedOptionsInvitedAddress({ optionsInvitedAddress: address }))
    },
    [dispatch],
  )

  return [optionsInvitedAddress, setOptionsInvitedAddress]
}
