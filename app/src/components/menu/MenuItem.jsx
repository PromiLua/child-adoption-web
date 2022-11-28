import React, { memo } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import IconExpandLess from '@mui/icons-material/ExpandLess';
import IconExpandMore from '@mui/icons-material/ExpandMore';

import NavItem from './NavItem';

const MenuItem = (props) => {
  const { name, href, Icon, items = [] } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(!open);

  const MenuItemRoot = (
    <NavItem href={href} onClick={handleClick}>
      {!!Icon && (
        <ListItemIcon>
          <Icon style={{ color: 'white' }} />
        </ListItemIcon>
      )}
      <ListItemText primary={name} inset={!Icon} style={{ color: 'white' }} />
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </NavItem>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding sx={{ marginLeft: 1 }}>
        {items.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

export default memo(MenuItem);
