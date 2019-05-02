const path = require('path');
const glob = require('glob');

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: './.styleguidist/introduction.md',
      sections: [
        {
          name: 'Colors',
          content: './.styleguidist/colors.md',
        },
      ],
      sectionDepth: 1,
    },
    {
      name: 'Components',
      content: './.styleguidist/components.md',
      sections: [
        {
          name: 'dev',
          components: () => {
            return glob.sync(path.resolve(__dirname, '../src/core/**/*.tsx'));
          },
        },
      ],
      sectionDepth: 2,
    },
  ],
};
