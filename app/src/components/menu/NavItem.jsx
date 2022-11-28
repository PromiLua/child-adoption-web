import React from 'react';
import ListItem from '@mui/material/ListItem';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = (props) => {
  const { onClick, href, children } = props;

  const location = useLocation();
  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  if (!href || typeof href !== 'string') {
    return (
      <ListItem
        disableGutters
        button
        children={children}
        onClick={onClick}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main',
          }),
          '& svg': {
            mr: 1,
          },
        }}
      />
    );
  }

  return (
    <ListItem
      disableGutters
      button
      children={children}
      component={RouterLink}
      sx={{
        color: 'text.secondary',
        fontWeight: 'medium',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        py: 1.25,
        textTransform: 'none',
        width: '100%',
        ...(active && {
          color: 'primary.main',
        }),
        '& svg': {
          mr: 1,
        },
      }}
      to={href}
    />
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default NavItem;
