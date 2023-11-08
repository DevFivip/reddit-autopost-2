import { ChakraProvider, Box, Heading, extendTheme, cookieStorageManagerSSR } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo } from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { withEmotionCache } from '@emotion/react'

import { ServerStyleContext, ClientStyleContext } from './context'




interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {

  const colors = {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    }
  }

  const theme = extendTheme({ colors })

  // here we can set the default color mode. If we set it to null,
  // there's no way for us to know what is the the user's preferred theme
  // so the cient will have to figure out and maybe there'll be a flash the first time the user visits us.
  const DEFAULT_COLOR_MODE: "dark" | "light" | null = 'dark';

  const CHAKRA_COOKIE_COLOR_KEY = "chakra-ui-color-mode";

  function getColorMode(cookies: string) {
    if (cookies == null) {
      return null;
    }
    const match = cookies.match(new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`));
    return match == null ? void 0 : match[2];
  }



  let cookies = useLoaderData<string>()

  // the client get the cookies from the document 
  // because when we do a client routing, the loader can have stored an outdated value
  if (typeof document !== "undefined") {
    cookies = document.cookie;
  }

  // get and store the color mode from the cookies.
  // It'll update the cookies if there isn't any and we have set a default value
  let colorMode = useMemo(() => {
    let color = getColorMode(cookies)

    if (!color && DEFAULT_COLOR_MODE) {
      cookies += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
      color = DEFAULT_COLOR_MODE;
    }

    return color
  }, [cookies]);



  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  }, []);



  return (
    <html
      lang="en"
      {...colorMode
      && {
        "data-theme": colorMode,
        "style": { colorScheme: colorMode },
      }
      }
    >
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body
        {...colorMode && {
          className: `chakra-ui-${colorMode}`
        }}
      >
        <ChakraProvider
          colorModeManager={cookieStorageManagerSSR(cookies)}
          theme={theme}
        >
          {children}
        </ChakraProvider>

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  )
});


export default function App() {
  return (<Document><Outlet /></Document>);
}
// How ChakraProvider should be used on CatchBoundary
// export function CatchBoundary() {
//   const caught = useCatch();

//   return (
//     <Document title={`${caught.status} ${caught.statusText}`}>
//       <ChakraProvider>
//         <Box>
//           <Heading as="h1" bg="purple.600">
//             [CatchBoundary]: {caught.status} {caught.statusText}
//           </Heading>
//         </Box>
//       </ChakraProvider>
//     </Document>
//   );
// }

// How ChakraProvider should be used on ErrorBoundary
// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <Document title="Error!">
//       <ChakraProvider>
//         <Box>
//           <Heading as="h1" bg="blue.500">
//             [ErrorBoundary]: There was an error: {error.message}
//           </Heading>
//         </Box>
//       </ChakraProvider>
//     </Document>
//   );
// }
