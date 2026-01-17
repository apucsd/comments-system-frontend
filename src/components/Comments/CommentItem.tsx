import React, { useState } from 'react';
import type { Comment } from '../../types';
import Avatar from '../UI/Avatar';
import { BsThreeDots } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { formatTimeAgo } from '../../utils/formatDate';
import CommentInput from './CommentInput';
import {
      useReplyToCommentMutation,
      useLikeCommentMutation,
      useDislikeCommentMutation,
      useDeleteCommentMutation,
} from '../../redux/features/comments/commentApi';
import { useAppSelector } from '../../redux/hooks';
import { toast } from 'react-hot-toast';
import { IoThumbsUpOutline, IoThumbsUp, IoThumbsDownOutline, IoThumbsDown } from 'react-icons/io5';

interface CommentItemProps {
      comment: Comment;
      isReply?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, isReply = false }) => {
      const commentUser = comment.author || comment.user;
      const { user } = useAppSelector((state) => state.auth);
      const [isReplying, setIsReplying] = useState(false);
      const [showReplies, setShowReplies] = useState(false);

      const [replyToComment] = useReplyToCommentMutation();
      const [likeComment] = useLikeCommentMutation();
      const [dislikeComment] = useDislikeCommentMutation();
      const [deleteComment] = useDeleteCommentMutation();

      const handleReply = async (text: string) => {
            if (!user) {
                  toast.error('Please login to reply');
                  return;
            }
            try {
                  await replyToComment({ id: comment._id, content: text }).unwrap();
                  setIsReplying(false);
                  setShowReplies(true);
                  toast.success('Reply added');
            } catch (err) {
                  toast.error('Failed to reply');
            }
      };

      const handleLike = async () => {
            if (!user) {
                  toast.error('Please login to like');
                  return;
            }
            try {
                  await likeComment(comment._id).unwrap();
            } catch (err) {
                  console.error('Failed to like', err);
            }
      };

      const handleDislike = async () => {
            if (!user) {
                  toast.error('Please login to dislike');
                  return;
            }
            try {
                  await dislikeComment(comment._id).unwrap();
            } catch (err) {
                  console.error('Failed to dislike', err);
            }
      };

      const handleDelete = async () => {
            if (confirm('Are you sure?')) {
                  try {
                        await deleteComment(comment._id).unwrap();
                        toast.success('Comment deleted');
                  } catch (err) {
                        toast.error('Failed to delete');
                  }
            }
      };

      const isOwner = user?._id === commentUser?._id;
      const likes = comment.likes || [];
      const dislikes = comment.dislikes || [];
      const hasLiked = user && likes.includes(user._id);
      const hasDisliked = user && dislikes.includes(user._id);

      return (
            <div className={`flex gap-3 ${isReply ? 'mt-3 pl-8' : 'mb-4'}`}>
                  <Avatar
                        src={commentUser?.profile || commentUser?.avatarUrl}
                        alt={commentUser?.username || 'User'}
                        size={isReply ? 'sm' : 'md'}
                  />

                  <div className="flex-1">
                        <div className="flex items-start justify-between group">
                              <div className="text-sm">
                                    <span className="font-semibold mr-1 inline-flex items-center gap-1">
                                          {commentUser?.username || commentUser?.name || 'Unknown User'}
                                          {commentUser?.isVerified && <MdVerified className="text-blue-500 text-xs" />}
                                    </span>
                                    <span className="text-gray-800 break-words whitespace-pre-wrap">
                                          {comment.content}
                                    </span>

                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-medium">
                                          <span>{formatTimeAgo(comment.createdAt)}</span>
                                          <div className="flex items-center gap-2">
                                                <button
                                                      onClick={handleLike}
                                                      className={`flex items-center gap-1 hover:text-gray-800 transition-colors ${hasLiked ? 'text-blue-600' : ''}`}
                                                >
                                                      {hasLiked ? (
                                                            <IoThumbsUp className="w-3 h-3" />
                                                      ) : (
                                                            <IoThumbsUpOutline className="w-3 h-3" />
                                                      )}
                                                      {likes.length > 0 && <span>{likes.length}</span>}
                                                </button>
                                                <button
                                                      onClick={handleDislike}
                                                      className={`flex items-center gap-1 hover:text-gray-800 transition-colors ${hasDisliked ? 'text-red-600' : ''}`}
                                                >
                                                      {hasDisliked ? (
                                                            <IoThumbsDown className="w-3 h-3" />
                                                      ) : (
                                                            <IoThumbsDownOutline className="w-3 h-3" />
                                                      )}
                                                      {dislikes.length > 0 && <span>{dislikes.length}</span>}
                                                </button>
                                          </div>
                                          <button
                                                onClick={() => setIsReplying(!isReplying)}
                                                className="hover:text-gray-800 cursor-pointer"
                                          >
                                                Reply
                                          </button>
                                          {isOwner && (
                                                <button
                                                      onClick={handleDelete}
                                                      className="hover:text-red-600 cursor-pointer"
                                                >
                                                      Delete
                                                </button>
                                          )}
                                    </div>
                              </div>
                        </div>

                        {isReplying && (
                              <div className="mt-2">
                                    <CommentInput
                                          onPost={handleReply}
                                          placeholder={`Reply to @${commentUser?.username || 'user'}...`}
                                          autoFocus
                                    />
                              </div>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-1">
                                    {!showReplies && comment.replies.length > 0 && (
                                          <button
                                                onClick={() => setShowReplies(true)}
                                                className="flex items-center gap-2 text-xs text-gray-500 font-semibold my-2 before:content-[''] before:block before:w-6 before:h-[1px] before:bg-gray-300"
                                          >
                                                View replies ({comment.replies.length})
                                          </button>
                                    )}

                                    {showReplies && (
                                          <div className="flex flex-col">
                                                <button
                                                      onClick={() => setShowReplies(false)}
                                                      className="flex items-center gap-2 text-xs text-gray-500 font-semibold my-2 before:content-[''] before:block before:w-6 before:h-[1px] before:bg-gray-300"
                                                >
                                                      Hide replies
                                                </button>
                                                {comment.replies.map((reply) => (
                                                      <CommentItem
                                                            key={reply._id}
                                                            comment={{ ...reply, user: reply.author || reply.user }}
                                                            isReply={true}
                                                      />
                                                ))}
                                          </div>
                                    )}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default CommentItem;
