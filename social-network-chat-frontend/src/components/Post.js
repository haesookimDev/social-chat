// src/components/Post.js
import React from 'react';

function Post({ post }) {
  return (
    <div>
      <h4>{post.author.username}</h4>
      <p>{post.content}</p>
      <p>Likes: {post.likes.length}</p>
      {/* 기타 게시물 관련 UI */}
    </div>
  );
}

export default Post;
