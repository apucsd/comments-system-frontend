import CommentList from '../components/Comments/CommentList';
import CommentInput from '../components/Comments/CommentInput';
import Avatar from '../components/UI/Avatar';
import { BsThreeDots } from 'react-icons/bs';
import { IoHeartOutline, IoChatbubbleOutline, IoPaperPlaneOutline, IoBookmarkOutline } from 'react-icons/io5';
import { useGetCommentsQuery, useCreateCommentMutation } from '../redux/features/comments/commentApi';
import { useAppSelector } from '../redux/hooks';
import { toast } from 'react-hot-toast';

const PostPage = () => {
      const { user } = useAppSelector((state) => state.auth);
      const { data, isLoading } = useGetCommentsQuery({ sort: '-createdAt', page: 1, limit: 10 });
      const [createComment] = useCreateCommentMutation();

      const handleAddComment = async (text: string) => {
            if (!user) {
                  toast.error('Please login to comment');
                  return;
            }
            try {
                  await createComment({ content: text }).unwrap();
                  toast.success('Comment added!');
            } catch (err) {
                  toast.error('Failed to add comment');
            }
      };

      const post = {
            imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            user: {
                  username: 'design_daily',
                  avatarUrl: 'https://i.pravatar.cc/150?u=design_daily',
                  location: 'San Francisco, CA',
            },
            caption: 'Minimalist workspace setup for maximum productivity. 💻✨ \n#design #workspace #minimalism #setup',
            timestamp: '2 HOURS AGO',
      };

      return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
                  <div className="bg-white border border-gray-200 rounded-sm flex flex-col md:flex-row max-w-5xl w-full h-[85vh] shadow-sm overflow-hidden">
                        <div className="hidden md:flex md:w-[60%] bg-black items-center justify-center relative">
                              <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full md:w-[40%] flex flex-col h-full bg-white">
                              <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                                    <div className="flex items-center gap-3">
                                          <Avatar src={post.user.avatarUrl} alt={post.user.username} size="sm" />
                                          <div className="text-sm font-semibold hover:opacity-50 cursor-pointer">
                                                {post.user.username}
                                          </div>
                                    </div>
                                    <button className="text-gray-900">
                                          <BsThreeDots />
                                    </button>
                              </div>

                              <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
                                    <div className="flex gap-3 mb-6">
                                          <Avatar src={post.user.avatarUrl} alt={post.user.username} size="md" />
                                          <div className="text-sm">
                                                <span className="font-semibold mr-2">{post.user.username}</span>
                                                <span className="whitespace-pre-wrap">{post.caption}</span>
                                                <div className="mt-2 text-xs text-gray-500 font-medium">
                                                      {post.timestamp}
                                                </div>
                                          </div>
                                    </div>

                                    {isLoading ? (
                                          <p className="text-center text-gray-500">Loading comments...</p>
                                    ) : (
                                          <CommentList comments={data?.data.data || []} />
                                    )}
                              </div>

                              <div className="px-4 py-3 border-t border-gray-100 shrink-0">
                                    <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-4 text-2xl text-gray-800">
                                                <button className="hover:text-gray-500">
                                                      <IoHeartOutline />
                                                </button>
                                                <button className="hover:text-gray-500">
                                                      <IoChatbubbleOutline />
                                                </button>
                                                <button className="hover:text-gray-500">
                                                      <IoPaperPlaneOutline />
                                                </button>
                                          </div>
                                          <button className="text-2xl text-gray-800 hover:text-gray-500">
                                                <IoBookmarkOutline />
                                          </button>
                                    </div>
                                    <div className="text-sm font-semibold mb-1">1,245 likes</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                          {post.timestamp}
                                    </div>
                              </div>

                              <div className="shrink-0">
                                    <CommentInput onPost={handleAddComment} placeholder="Add a comment..." />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default PostPage;
