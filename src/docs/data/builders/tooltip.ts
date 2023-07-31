import { ATTRS, KBD, PROPS } from '$docs/constants';
import type { KeyboardSchema } from '$docs/types';
import { builderSchema, elementSchema } from '$docs/utils/content';
import type { BuilderData } from '.';

/**
 * Props that are also returned in the form of stores via the `options` property.
 */
const OPTION_PROPS = [
	PROPS.POSITIONING({ default: "position: 'top'" }),
	PROPS.ARROW_SIZE,
	PROPS.CLOSE_ON_ESCAPE,
	PROPS.FORCE_VISIBLE,
	PROPS.PORTAL,
	{
		name: 'closeOnPointerDown',
		type: 'boolean',
		default: 'true',
		description: 'Whether the tooltip closes when the pointer is down.',
	},
	{
		name: 'openDelay',
		type: 'number',
		default: '1000',
		description: 'The delay in milliseconds before the tooltip opens after a pointer over event.',
	},
	{
		name: 'closeDelay',
		type: 'number',
		default: '500',
		description: 'The delay in milliseconds before the tooltip closes after a pointer leave event.',
	},
];

const BUILDER_NAME = 'tooltip';

const builder = builderSchema(BUILDER_NAME, {
	title: 'createTooltip',
	props: [...OPTION_PROPS, PROPS.DEFAULT_OPEN, PROPS.OPEN, PROPS.ON_OPEN_CHANGE],
	elements: [
		{
			name: 'trigger',
			description: 'The builder store used to create the tooltip trigger.',
		},
		{
			name: 'content',
			description: 'The builder store used to create the tooltip content.',
		},
		{
			name: 'arrow',
			description: 'The builder store used to create the tooltip arrow.',
		},
	],
	states: [
		{
			name: 'open',
			type: 'Readable<boolean>',
			description: 'A readable store that indicates whether the tooltip is open or not',
		},
	],
	options: OPTION_PROPS,
});

const trigger = elementSchema('trigger', {
	description: 'The tooltip trigger element.',
	dataAttributes: [
		{
			name: 'data-state',
			value: ATTRS.OPEN_CLOSED,
		},
		{
			name: 'data-melt-tooltip-trigger',
			value: ATTRS.MELT('tooltip trigger'),
		},
	],
});

const content = elementSchema('content', {
	description: 'The tooltip content element.',
	dataAttributes: [
		{
			name: 'data-melt-tooltip-content',
			value: ATTRS.MELT('tooltip content'),
		},
	],
});

const arrow = elementSchema('arrow', {
	description: 'The tooltip arrow element.',
	dataAttributes: [
		{
			name: 'data-arrow',
			value: ATTRS.TRUE,
		},
		{
			name: 'data-melt-tooltip-arrow',
			value: ATTRS.MELT('tooltip arrow'),
		},
	],
});

const keyboard: KeyboardSchema = [
	{
		key: KBD.TAB,
		behavior: 'Opens/closes the tooltip without delay.',
	},
	{
		key: KBD.SPACE,
		behavior: 'If open, closes the tooltip without delay.',
	},
	{
		key: KBD.ENTER,
		behavior: 'If open, closes the tooltip without delay.',
	},
	{
		key: KBD.ESCAPE,
		behavior: 'If open, closes the tooltip without delay.',
	},
];

const schemas = [builder, trigger, content, arrow];

const features: BuilderData['features'] = [
	'Opens when the trigger is focused or hovered',
	'Closes when the trigger is activated or with escape',
	'Custom delay for opening and closing',
	'Supports custom positioning',
];

export const tooltipData: BuilderData = {
	schemas,
	features,
	keyboard,
};
