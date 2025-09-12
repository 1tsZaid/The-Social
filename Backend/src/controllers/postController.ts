import { Request, Response } from 'express';
import { postService } from '../services/postService';


export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
    };
}

export class PostController {
    async createPost (req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const userId = req.user.userId; // from middleware
            const post = await postService.createPost(userId, req.body);
            res.status(201).json(post);
        } catch (err) {
            if (err instanceof Error) {
                res.status(404).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
            res.status(500).json({ error: 'Failed to create post' });
        }
    }
    
    async deletePost(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const { postId } = req.params;
            await postService.deletePost(postId);
            res.status(200).json({ message: 'Post deleted' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(404).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async likePost (req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
        }
        const userId = req.user.userId;
        const { postId } = req.params;
        await postService.likePostByUserId(postId, userId);
        res.status(200).json({ message: 'Post liked' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        res.status(500).json({ error: 'Failed to like post' });
    }
    };

    async getCommunityPosts(req: Request, res: Response): Promise<void> {
    try {
        const { communityId } = req.params;

        const sortBy: 'popular' | 'latest' = req.query.sortBy === 'popular' ? 'popular' : 'latest';

        const params = {
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            page: req.query.page ? Number(req.query.page) : undefined,
            sortBy,
        };

        const posts = await postService.getCommunityPosts(communityId, params);
        res.status(200).json(posts);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
    };

    async getCommunityPostsBeforeId(req: Request, res: Response): Promise<void> {
    try {
        const { communityId } = req.params;

        const sortBy: 'popular' | 'latest' = req.query.sortBy === 'popular' ? 'popular' : 'latest';

        const params = {
            beforePostId: String(req.query.beforePostId),
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            sortBy,
        };

        const posts = await postService.getCommunityPostsBeforeId(
            communityId,
            params
        );
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts before ID' });
        if (err instanceof Error) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    };
}

export const postController = new PostController();