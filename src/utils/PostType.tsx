import { CommentType } from './CommentType'

export interface PostType {
	id: number
	username: string
	postImage: string
	postText: string
	likes: number
	comments: CommentType[]
}
