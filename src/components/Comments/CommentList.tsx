import React from 'react';
import type { Comment } from '../../types';
import CommentItem from './CommentItem';

interface CommentListProps {
      comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
      return (
            <div className="flex flex-col pb-4">
                  {comments.map((comment) => {
                        const mappedComment = {
                              ...comment,
                              user: comment.author || comment.user,
                        };
                        return <CommentItem key={comment._id} comment={mappedComment} />;
                  })}
            </div>
      );
};

export default CommentList;
