// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { logout } from '../redux/userSlice';

function Navbar() {
  const { user } = useSelector((state) => state.user); // 현재 로그인한 사용자 정보 가져오기
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* 홈 버튼 */}
        <IconButton color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>

        {/* 사이트 제목 */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Social Network
        </Typography>

        {/* 로그인 상태에 따라 다른 버튼 표시 */}
        {user ? (
          <>
            {/* 프로필 버튼 */}
            <IconButton color="inherit" component={Link} to={`/profile/${user.id}`}>
              <AccountCircleIcon />
            </IconButton>

            {/* 로그아웃 버튼 */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* 로그인 버튼 */}
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>

            {/* 회원가입 버튼 */}
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
