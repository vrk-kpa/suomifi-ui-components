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
    '@global body': {
      fontFamily: '"Source Sans Pro", sans-serif',
      margin: 0,
      padding: 0,
    },
    content: {
      maxWidth: '1200px',
      margin: '0',
      '@media (min-width: 1432px)': {
        marginLeft: '32px',
      },
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
  ExamplePlaceholder: {
    button: {
      display: 'none',
    },
  },
  Type: {
    type: {
      display: 'block',
      overflowY: 'auto',
      maxHeight: '6em',
      minWidth: '20vw',
    },
  },
  Table: {
    cell: {
      position: 'relative',
      '&:after': {
        display: 'block',
        content: '""',
        position: 'absolute',
        top: '0',
        height: '100%',
        width: '100%',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 4.5em, rgba(255, 255, 255, 1) 6em)',
        pointerEvents: 'none',
      },
    },
  },
  Playground: {
    preview: {
      '&:not([data-preview="Text"]) > div': {
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
