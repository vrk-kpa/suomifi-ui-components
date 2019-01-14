const grid440px24px = {
  display: 'grid',
  rowGap: '24px',
  maxWidth: '440px',
  justifyItems: 'start',
};

module.exports = {
  Logo: {
    logo: {
      color: '#003479',
    },
  },
  StyleGuide: {
    '@global html': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    '@global body': {
      fontFamily: '"Source Sans Pro", sans-serif',
      margin: 0,
      padding: 0,
    },
    '@global *, *:before, *:after': {
      boxSizing: 'inherit',
    },
  },
  ReactComponent: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      order: '0',
      marginBottom: '0',
    },
    docs: {
      order: '1',
      marginBottom: '24px',
    },
    tabs: {
      order: '3',
    },
  },
  Pathline: {
    pathline: {
      display: 'none',
    },
  },
  Examples: {
    root: {
      order: '2',
    },
  },
  Type: {
    type: {
      position: 'relative',
      display: 'block',
      overflowY: 'hidden',
      maxHeight: '4.5em',
      '&:after': {
        display: 'block',
        content: '""',
        position: 'absolute',
        top: '0',
        height: '100%',
        width: '100%',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 3em, rgba(255, 255, 255, 1) 4.5em)',
      },
    },
  },
  Playground: {
    preview: {
      '& > div, & > div:not(.no-grid)': {
        ...grid440px24px,
        '& [example="negative"]': {
          ...grid440px24px,
          padding: '24px',
          backgroundColor: '#2A6EBB',
        },
      },
    },
  },
};
