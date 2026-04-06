export const directionOptions = {
  left: {title: 'Left', value: 'left'},
  right: {title: 'Right', value: 'right'},
} as const

export const leftRightOptions = Object.values(directionOptions)
