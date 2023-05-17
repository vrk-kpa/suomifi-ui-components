/**
 * Copied from react-styleguidist v.13.1.1 (identical to v.11.2.1)
 * and modified to add conditional InlineAlert about documentation version
 * https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/StyleGuide/StyleGuideRenderer.tsx
 */

import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'react-styleguidist/lib/client/rsg-components/Logo';
import Styled from 'react-styleguidist/lib/client/rsg-components/Styled';
import cx from 'clsx';
import { Classes } from 'jss';
import Ribbon from 'react-styleguidist/lib/client/rsg-components/Ribbon';
import Version from 'react-styleguidist/lib/client/rsg-components/Version';
import * as Rsg from 'react-styleguidist/lib/typings';
import { InlineAlert } from '../src/core/Alert/InlineAlert/InlineAlert';

const styles = ({
  color,
  fontFamily,
  fontSize,
  sidebarWidth,
  mq,
  space,
  maxWidth,
}: Rsg.Theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    paddingLeft: sidebarWidth,
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: color.sidebarBackground,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: sidebarWidth,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  logo: {
    padding: space[2],
    borderBottom: [[1, color.border, 'solid']],
  },
  footer: {
    display: 'block',
    color: color.light,
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
});

export interface JssInjectedProps {
  classes: Classes;
}

interface StyleGuideRendererProps extends JssInjectedProps {
  title: string;
  version?: string;
  homepageUrl: string;
  children: React.ReactNode;
  toc?: React.ReactNode;
  hasSidebar?: boolean;
}

export const StyleGuideRenderer: React.FunctionComponent<
  StyleGuideRendererProps
> = ({ classes, title, version, children, toc, hasSidebar }) => {
  return (
    <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
      <main className={classes.content}>
        {process.env.BUILD_TYPE === 'ASSETS' && (
          <InlineAlert style={{ marginBottom: '20px' }}>
            You are browsing old documentation version. See{' '}
            <a href={process.env.BASE_PATH}>latest documentation</a>.
          </InlineAlert>
        )}
        {children}
        <footer className={classes.footer}></footer>
      </main>
      {hasSidebar && (
        <div className={classes.sidebar} data-testid="sidebar">
          <header className={classes.logo}>
            <Logo>{title}</Logo>
            {version && <Version>{version}</Version>}
          </header>
          {toc}
        </div>
      )}
      <Ribbon />
    </div>
  );
};

StyleGuideRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  toc: PropTypes.any.isRequired,
  hasSidebar: PropTypes.bool,
};

export default Styled<StyleGuideRendererProps>(styles)(StyleGuideRenderer);
