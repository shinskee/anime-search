import { Outlet } from "react-router-dom";
import { Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, Stack, Toolbar, useMediaQuery } from "@mui/material";
import LeftBar from "./ui/LeftBar/LeftBar";
import RightBar from "./ui/RightBar/RightBar";
import Tabs from "./ui/Tabs/Tabs";
import { useTheme } from "@emotion/react";

function Layout() {
  // const theme = useTheme();
  // const breakpoint = useMediaQuery(theme.breakpoints.down('sm'));
  // if (breakpoint) {
  //   return (
  //     <Stack marginTop={0} paddingTop={0} display={'grid'} gridTemplateColumns={'1fr 4fr 1fr'} > 
  //         <Container>
  //           <Stack height={'100%'} paddingBottom={2}>
  //             <Tabs />
  //             <Outlet />
  //           </Stack>
  //         </Container>
  //     </Stack>
  //   )
  // }
  return (
      <Box marginTop={0} paddingTop={0} display={{xs: 'block', sm: 'grid', md: 'grid'}} gridTemplateColumns={'1fr 4fr 1fr'} > 
        <Box display={{xs: 'none', sm: 'block', md: 'block'}}>
          <LeftBar />
        </Box>
          <Container>
            <Stack height={'100%'} paddingBottom={2}>
              <Tabs />
              <Outlet />
            </Stack>
          </Container>
        <Box display={{xs: 'none', sm: 'block', md: 'block'}}>
          <RightBar />
        </Box>
      </Box>
  );
}

export default Layout;
