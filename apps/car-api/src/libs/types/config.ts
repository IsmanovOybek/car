import { ObjectId } from 'bson';

export const availableAgentSorts = ['createdAt', 'updateAt', 'memberLike', 'memberViews', 'memberRank'];
export const availableMemberSorts = ['createdAt', 'updateAt', 'memberLike', 'memberViews'];

export const availableOptions = ['carBarter', 'carRent'];
export const availablePropertySorts = ['createdAt', 'updatedAt', 'carLikes', 'carViews', 'carRank', 'carPrice'];

export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];

export const availableCommentSorts = ['createdAt', 'updatedAt'];

// IMAGE CONFIGURATION (config.js)
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './common';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};

export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};

export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
	return {
		$lookup: {
			from: 'likes',
			let: {
				localLikeRefId: targetRefId,
				localMemberId: memberId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0,
						memberId: 1,
						likeRefId: 1,
						myFavorite: '$$localMyFavorite',
					},
				},
			],
			as: 'meLiked',
		},
	};
};


interface LookupAuthMemberFollowed {
	followerId: T;
	followingId: string;
}

export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => {
	const { followerId, followingId } = input;
	return {
		$lookup: {
			from: 'follows',
			let: {
				localFollowerId: followerId,
				localFollowingId: followingId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$followerId', '$$localFollowerId'] }, { $eq: ['$followingId', '$$localFollowingId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0,
						followerId: 1,
						followingId: 1,
						myFollowing: '$$localMyFavorite',
					},
				},
			],  
			as: 'meFollowed',
		},
	};
};

export const lookupMember = {
	$lookup: {
		from: 'members', // MongoDB’dagi members collectiondan qidiradi.
		localField: 'memberId', //propertydagi memberId ni olib
		foreignField: '_id', //members’dagi _id bilan taqqoslab
		as: 'memberData', // shu yerga datani yozadi
	},
};

export const lookupFollowingData = {
	$lookup: {
		from: 'members', // MongoDB’dagi members collectiondan qidiradi.
		localField: 'followingId', //follow memberId ni olib
		foreignField: '_id', //members’dagi _id bilan taqqoslab
		as: 'followingData', // shu yerga datani yozadi
	},
};

export const lookupFollowerData = {
	$lookup: {
		from: 'members', // MongoDB’dagi members collectiondan qidiradi.
		localField: 'followerId', //propertydagi memberId ni olib
		foreignField: '_id', //members’dagi _id bilan taqqoslab
		as: 'followerData', // shu yerga datani yozadi
	},
};

export const lookupFavorite = {
	$lookup: {
		from: 'members',
		localField: 'favoriteProperty.memberId',
		foreignField: '_id',
		as: 'favoriteProperty.memberData',
	},
};