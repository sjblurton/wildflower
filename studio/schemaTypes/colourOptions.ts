export const colourOptions = {
	white: {title: 'White', value: 'white'},
	black: {title: 'Black', value: 'black'},
	primary: {title: 'Primary', value: 'primary'},
	secondary: {title: 'Secondary', value: 'secondary'},
} as const


export const textColourOptions = [
	{title: colourOptions.black.title, value: colourOptions.black.value},
	{title: colourOptions.white.title, value: colourOptions.white.value},
	{title: colourOptions.primary.title, value: colourOptions.primary.value},
	{title: colourOptions.secondary.title, value: colourOptions.secondary.value},
]

export const backgroundColourOptions = [
	{title: colourOptions.white.title, value: colourOptions.white.value},
	{title: colourOptions.black.title, value: colourOptions.black.value},
	{title: colourOptions.primary.title, value: colourOptions.primary.value},
	{title: colourOptions.secondary.title, value: colourOptions.secondary.value},
]
