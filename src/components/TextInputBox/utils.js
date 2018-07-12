import _ from 'lodash';

export function hasValue(value){
  if(_.isNil(value)) return false;
  if(value === '') return false;
  return true;
}
