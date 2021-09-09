const colorScheme = {
  primary: '#D1FAE5',
  secondary: '#FEF3C7',
  tertiary: '#FEE2E2',
};

export function getColorByPriority(priority) {
  let color = colorScheme.primary;
  switch (priority) {
    case 1:
      color = colorScheme.primary;
      break;
    case 2:
      color = colorScheme.secondary;
      break;
    default:
      color = colorScheme.tertiary;
      break;
  }

  return color;
}

export default colorScheme;
