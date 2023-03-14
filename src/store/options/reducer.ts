import { createReducer } from '@reduxjs/toolkit';
import { defaultReferrerAddress, AddressState } from './types';
import { updatedOptionsInvitedAddress } from './actions';

export const initialState: AddressState = {
  optionsInvitedAddress: defaultReferrerAddress, // 默认地址
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updatedOptionsInvitedAddress, (state, action) => {
    state.optionsInvitedAddress = action.payload.optionsInvitedAddress;
  })
);
