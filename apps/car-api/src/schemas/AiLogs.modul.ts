import { Schema } from 'mongoose';
import { AiLogsType } from '../libs/enums/aiLogs.enum';

const AiLogsSchema = new Schema(
	{
		aiLogsType: {
			type: String,
			enum: AiLogsType,
			required: true,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		query: {
			type: String,
			required: true,
		},
		parsedQuery: {
			type: Schema.Types.Mixed,
			required: false, // optional qilsak ham bo‘ladi
		},

		response: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, collection: 'aiLogs' },
);

export default AiLogsSchema;
