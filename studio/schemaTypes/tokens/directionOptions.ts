export const directionOptions = {
  left: {title: 'Left', value: 'left'},
  right: {title: 'Right', value: 'right'},
  center: {title: 'Center', value: 'center'},
} as const

export const leftRightOptions = [directionOptions.left, directionOptions.right]
