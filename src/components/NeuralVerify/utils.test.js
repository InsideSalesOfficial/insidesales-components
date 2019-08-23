import { getVerifiedState } from './utils';
import { verifiedStates } from './constants';

const verifiedDescriptor = {
  state: 1,
  detail: 'recent_positive'
};

const verifiedBadEmailDescriptor = {
  state: -1,
  detail: 'bounce_list'
};

const verifiedBadPhoneDescriptor = {
  state: -1,
  detail: 'disconnected'
};

const verifiedHighDescriptor = {
  state: 1,
  detail: 'super_verified'
};

const faxDescriptor = {
  state: -1,
  detail: 'fax_number'
};

const corporateDescriptor = {
  state: 0,
  detail: 'gate_keeper'
};

const newDescriptor = {
  state: 0,
  detail: 'unknown_id'
};

const staleDescriptor = {
  state: -1,
  detail: 'stale_id'
};

const unverifiedDescriptor = {
  state: 0,
  detail: ''
};

// TODO: Implement this test when these states are provided by the neuralverify API

// const mobileDesciptor = {
//   state: 0,
//   detail: ''
// };


describe('calculating neuralverify state', () => {
  it('should return VERIFIED when state === 1 and detail === "recent_positive"', () => {
    expect(getVerifiedState(verifiedDescriptor.state, verifiedDescriptor.detail)).toEqual(verifiedStates.VERIFIED);
  });

  it('should return VERIFIED_HIGH when state === 1 and detail === "super_verified"', () => {
    expect(getVerifiedState(verifiedHighDescriptor.state, verifiedHighDescriptor.detail)).toEqual(verifiedStates.VERIFIED_HIGH);
  });

  it('should return VERIFIED_BAD when state === -1  and detail === "disconnected"', () => {
    expect(getVerifiedState(verifiedBadPhoneDescriptor.state, verifiedBadPhoneDescriptor.detail)).toEqual(verifiedStates.VERIFIED_BAD);
  });

  it('should return FAX when state ===  -1 and detail === "fax_index"', () => {
    expect(getVerifiedState(faxDescriptor.state, faxDescriptor.detail)).toEqual(verifiedStates.FAX);
  });

  it('should return CORPORATE when state === 0 and detail === "gate_keeper"', () => {
    expect(getVerifiedState(corporateDescriptor.state, corporateDescriptor.detail)).toEqual(verifiedStates.CORPORATE);
  });

});
