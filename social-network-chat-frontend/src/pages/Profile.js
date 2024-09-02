// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import Button from '@mui/material/Button';

function Profile() {
  const { id } = useParams(); // URL에서 사용자 ID를 가져옵니다.
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useSelector((state) => state.user); // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`);
        setUserProfile(response.data);

        // 현재 사용자가 프로필 사용자를 팔로우하고 있는지 확인
        setIsFollowing(response.data.followers.includes(user.id));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/user/${id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [id, user.id]);

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:3000/api/users/${id}/follow`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
      setIsFollowing(true);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:3000/api/users/${id}/unfollow`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
      setIsFollowing(false);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  if (!userProfile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{userProfile.username}'s Profile</h2>
      <p>Email: {userProfile.email}</p>
      <p>Followers: {userProfile.followers.length}</p>
      <p>Following: {userProfile.following.length}</p>

      {/* Follow/Unfollow 버튼 */}
      {user.id !== id && (
        isFollowing ? (
          <Button variant="contained" color="secondary" onClick={handleUnfollow}>
            Unfollow
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleFollow}>
            Follow
          </Button>
        )
      )}

      {/* 게시물 목록 */}
      <h3>Posts</h3>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Profile;
