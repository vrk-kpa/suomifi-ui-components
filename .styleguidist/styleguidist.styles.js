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
      '& i.semantics': {
        '&:before': {
          position: 'relative',
          top: '-.75em',
          display: 'block',
          content: '"<contains semantic elements>"',
          fontSize: '.8em',
          color: 'hsl(23, 82%, 53%)',
        },
      },
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
      maxHeight: '144px',
      minWidth: '20vw',
    },
  },
  Table: {
    cell: {
      position: 'relative',
      borderBottom: '1px solid #e8e8e8',
      lineHeight: '24px',
    },
  },
  Playground: {
    preview: {
      '&:not([data-preview="Text"]) > div': {
        ...grid440px24px,
        '& [example="inverted"]': {
          ...grid440px24px,
          padding: '24px',
          backgroundColor: '#2A6EBB',
        },
      },
    },
  },
};
