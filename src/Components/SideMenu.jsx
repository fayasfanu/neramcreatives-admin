import React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useLocation, useNavigate } from 'react-router-dom';

/*
  The navigation structure uses a normalized path:
  - For the root route (Dashboard), we set segment: "" so that when the pathname "/" is normalized (removing the leading slash),
    it matches as an empty string.
  - For the sub-menu items, the segments are defined without a leading "/".
*/
const NAVIGATION = [
  {
    // Dashboard: when at "/" the normalized path is ""
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Forms',
    icon: <DescriptionIcon />,
    // Parent has no segment; its child is clickable.
    children: [
      {
        segment: 'NeramFreelancerForm',
        title: 'NeramFreelancerForm',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    title: 'Form List',
    icon: <FormatListBulletedIcon />,
    children: [
      {
        segment: 'FreelancerFormDisplay',
        title: 'FreelancerFormDisplay',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

/*
  useRouterIntegration creates a router object that Toolpad's AppProvider expects.
  We normalize the current pathname by removing the leading slash.
  Then, when navigation is requested, if the path does not start with a slash,
  we add one.
*/
function useRouterIntegration() {
  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/^\//, ''); // e.g. "/" becomes "" and "/NeramFreelancerForm" becomes "NeramFreelancerForm"
  return React.useMemo(
    () => ({
      pathname: normalizedPath,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) =>
        navigate(path.startsWith('/') ? path : '/' + path),
    }),
    [normalizedPath, location.search, navigate]
  );
}

const SideMenu = ({ children }) => {
  const router = useRouterIntegration();

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default SideMenu;
