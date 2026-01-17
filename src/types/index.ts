export interface User {
      _id: string;
      username?: string;
      name?: string;
      email: string;
      profile?: string;
      avatarUrl?: string;
      isVerified?: boolean;
}

export interface Comment {
      _id: string;
      id?: string;
      author?: User;
      user?: User;
      pageId?: string;
      content: string;
      createdAt: string;
      updatedAt?: string;
      likes: string[];
      dislikes: string[];
      replies: Comment[];
      likeCount?: number;
      dislikeCount?: number;
      parentId?: string | null;
}
