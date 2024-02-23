import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';
import { Context } from '../context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { color } from '@mui/system';

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 20px',
  color: 'black',
  textDecoration: 'none',
  cursor: 'pointer',
};

const activeButtonStyle = {
  ...buttonStyle,
  color: 'blue',
  borderBottom: '2px solid blue',
};

const TopNav = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState(null);
  const { state, dispatch } = useContext(Context);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setActiveButton(router.pathname);
  }, [router.pathname]);

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
    try {
      const { data } = await axios.get('/api/logout');
      toast(data.message, {
        autoClose: 1000, // Close after 2 seconds
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        hideDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const isDashboardActive = router.pathname == '/user';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
      {!state.user && (
          <Link href="/candidate">
          <p style={activeButton == '/candidate' ? activeButtonStyle : buttonStyle}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px' }} />
            Register as Candidate
          </p>
        </Link>
        )}
        
          <Link href="/">
          <p style={activeButton == '/' ? activeButtonStyle : buttonStyle}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px' }} />
            Global Candidate Showcase
          </p>
        </Link>
        
        {state.user && (
          <Link href="/newcandidates">
          <p style={activeButton == '/newcandidates' ? activeButtonStyle : buttonStyle}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px' }} />
            New Registered Candidates
          </p>
        </Link>
        )}
        
        {state.user && (
          <Link href={'/creator/image/create'}>
            <p style={(activeButton == '/creator/image/create') ? activeButtonStyle : buttonStyle}>
                <>
                  <FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '5px' }} />
                  Add Candidate
                </>
            </p>
          </Link>
        )}
        {state.user && (
          <Link href="/creator">
            <p style={activeButton == '/creator' ? activeButtonStyle : buttonStyle}>
              <FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '5px' }} />
              Candidate Management
            </p>
          </Link>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        {state.user && (
          <div>
            <p
              style={{ ...buttonStyle, cursor: 'pointer', marginRight: '5px', ...(isDashboardActive && activeButtonStyle) }}
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
              <div className='text-black'>{state.user.name}</div>
            </p>
            {showDropdown && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#ffffff',
                  border: '1px solid #ccc',
                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  zIndex: 1,
                }}
              >
                <Link href="/user">
                  <p
                    style={{
                      ...buttonStyle,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      margin: '0',
                    }}
                    onClick={hideDropdown}
                  >
                    <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px' }} />
                    Dashboard
                  </p>
                </Link>
                <p
                  style={{
                    ...buttonStyle,
                    padding: '8px 20px',
                    cursor: 'pointer',
                    margin: '0',
                  }}
                  onClick={() => {
                    logout();
                    hideDropdown();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} />
                  Logout
                </p>
              </div>
            )}
          </div>
        )}

        {!state.user && (
          <div>
            <Link href="/login">
              <p style={activeButton == '/login' ? activeButtonStyle : buttonStyle}>
                <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '5px' }} />
                Login
              </p>
            </Link>
            <Link href="/register">
              <p style={activeButton == '/register' ? activeButtonStyle : buttonStyle}>
                <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '5px' }} />
                Register
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
