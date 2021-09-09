/* eslint-disable import/prefer-default-export */
const periodSchema = {
  warehouse: (value) => /^([ÆØÅæøåA-Za-z]+)$/.test(value),
  priority: (value) => parseInt(value, 10) === Number(value),
  // TODO add all period attributes to validate
};

export function validatePeriod(period) {
  return Object.keys(periodSchema)
    .filter((key) => !periodSchema[key](period[key]))
    .map((key) => new Error(`${key} is invalid`));
}
