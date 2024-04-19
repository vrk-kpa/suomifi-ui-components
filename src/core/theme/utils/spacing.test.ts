import {
  spacingStyles,
  MarginProps,
  SpacingProps,
  separateMarginProps,
  separateMarginAndPaddingProps,
} from './spacing';

describe('spacing utils', () => {
  describe('test separateMarginProps', () => {
    const props: MarginProps & any = {
      margin: 's',
      mx: 's',
      my: 's',
      mt: 's',
      month: 'June',
      mr: 's',
      mb: 's',
      ml: 's',
      title: 'Something',
    };

    const badProps: MarginProps = {
      margin: undefined,
      mx: undefined,
      my: undefined,
      mt: undefined,
      mr: undefined,
      mb: undefined,
      ml: undefined,
    };

    it('should return marginProps as first array object', () => {
      const [marginProps] = separateMarginProps(props);
      expect(marginProps).toHaveProperty('margin');
      expect(marginProps).toHaveProperty('mx');
      expect(marginProps).toHaveProperty('my');
      expect(marginProps).toHaveProperty('mt');
      expect(marginProps).toHaveProperty('mr');
      expect(marginProps).toHaveProperty('mb');
      expect(marginProps).toHaveProperty('ml');
    });

    it('should return passProps as second array object', () => {
      const [, passProps] = separateMarginProps(props);
      expect(passProps).toHaveProperty('month');
      expect(passProps).toHaveProperty('title');
    });

    it('should not return passProps with marginProps', () => {
      const [marginProps] = separateMarginProps(props);
      expect(marginProps).not.toHaveProperty('month');
      expect(marginProps).not.toHaveProperty('title');
    });

    it('should not return marginProps with passProps', () => {
      const [, passProps] = separateMarginProps(props);
      expect(passProps).not.toHaveProperty('margin');
      expect(passProps).not.toHaveProperty('mx');
      expect(passProps).not.toHaveProperty('my');
      expect(passProps).not.toHaveProperty('mt');
      expect(passProps).not.toHaveProperty('mr');
      expect(passProps).not.toHaveProperty('mb');
      expect(passProps).not.toHaveProperty('ml');
    });

    it('should not return undefined values with marginProps', () => {
      const [marginProps] = separateMarginProps(badProps);
      expect(marginProps).not.toHaveProperty('margin');
      expect(marginProps).not.toHaveProperty('mx');
      expect(marginProps).not.toHaveProperty('my');
      expect(marginProps).not.toHaveProperty('mt');
      expect(marginProps).not.toHaveProperty('mr');
      expect(marginProps).not.toHaveProperty('mb');
      expect(marginProps).not.toHaveProperty('ml');
    });
  });

  describe('test separateMarginAndPaddingProps', () => {
    const props: SpacingProps & any = {
      margin: 's',
      mx: 's',
      my: 's',
      mt: 's',
      month: 'June',
      mr: 's',
      mb: 's',
      ml: 's',
      padding: 's',
      px: 's',
      py: 's',
      pt: 's',
      pr: 's',
      pb: 's',
      pl: 's',
      title: 'Something',
    };

    const badProps: SpacingProps = {
      margin: undefined,
      mx: undefined,
      my: undefined,
      mt: undefined,
      mr: undefined,
      mb: undefined,
      ml: undefined,
      padding: undefined,
      px: undefined,
      py: undefined,
      pt: undefined,
      pr: undefined,
      pb: undefined,
      pl: undefined,
    };

    it('should return spacingProps as first array object', () => {
      const [spacingProps] = separateMarginAndPaddingProps(props);
      expect(spacingProps).toHaveProperty('margin');
      expect(spacingProps).toHaveProperty('mx');
      expect(spacingProps).toHaveProperty('my');
      expect(spacingProps).toHaveProperty('mt');
      expect(spacingProps).toHaveProperty('mr');
      expect(spacingProps).toHaveProperty('mb');
      expect(spacingProps).toHaveProperty('ml');
      expect(spacingProps).toHaveProperty('padding');
      expect(spacingProps).toHaveProperty('px');
      expect(spacingProps).toHaveProperty('py');
      expect(spacingProps).toHaveProperty('pt');
      expect(spacingProps).toHaveProperty('pr');
      expect(spacingProps).toHaveProperty('pb');
      expect(spacingProps).toHaveProperty('pl');
    });

    it('should return passProps as second array object', () => {
      const [, passProps] = separateMarginAndPaddingProps(props);
      expect(passProps).toHaveProperty('month');
      expect(passProps).toHaveProperty('title');
    });

    it('should not return passProps with spacingProps', () => {
      const [spacingProps] = separateMarginAndPaddingProps(props);
      expect(spacingProps).not.toHaveProperty('month');
      expect(spacingProps).not.toHaveProperty('title');
    });

    it('should not return spacingProps with passProps', () => {
      const [, passProps] = separateMarginAndPaddingProps(props);
      expect(passProps).not.toHaveProperty('margin');
      expect(passProps).not.toHaveProperty('mx');
      expect(passProps).not.toHaveProperty('my');
      expect(passProps).not.toHaveProperty('mt');
      expect(passProps).not.toHaveProperty('mr');
      expect(passProps).not.toHaveProperty('mb');
      expect(passProps).not.toHaveProperty('ml');
      expect(passProps).not.toHaveProperty('padding');
      expect(passProps).not.toHaveProperty('px');
      expect(passProps).not.toHaveProperty('py');
      expect(passProps).not.toHaveProperty('pt');
      expect(passProps).not.toHaveProperty('pr');
      expect(passProps).not.toHaveProperty('pb');
      expect(passProps).not.toHaveProperty('pl');
    });

    it('should not return undefined values with spacingProps', () => {
      const [spacingProps] = separateMarginAndPaddingProps(badProps);
      expect(spacingProps).not.toHaveProperty('margin');
      expect(spacingProps).not.toHaveProperty('mx');
      expect(spacingProps).not.toHaveProperty('my');
      expect(spacingProps).not.toHaveProperty('mt');
      expect(spacingProps).not.toHaveProperty('mr');
      expect(spacingProps).not.toHaveProperty('mb');
      expect(spacingProps).not.toHaveProperty('ml');
      expect(spacingProps).not.toHaveProperty('padding');
      expect(spacingProps).not.toHaveProperty('px');
      expect(spacingProps).not.toHaveProperty('py');
      expect(spacingProps).not.toHaveProperty('pt');
      expect(spacingProps).not.toHaveProperty('pr');
      expect(spacingProps).not.toHaveProperty('pb');
      expect(spacingProps).not.toHaveProperty('pl');
    });
  });

  describe('test spacingStyles', () => {
    describe('margin styles', () => {
      it('should set marginLeft and marginRight with mx', () => {
        const styles = spacingStyles({
          mx: 's',
        });
        expect(styles).toHaveProperty('marginRight');
        expect(styles).toHaveProperty('marginLeft');
      });

      it('should set marginTop and marginBottom with my', () => {
        const styles = spacingStyles({
          my: 's',
        });
        expect(styles).toHaveProperty('marginBottom');
        expect(styles).toHaveProperty('marginTop');
      });

      it('should set margin', () => {
        const styles = spacingStyles({
          margin: 's',
        });
        expect(styles).toHaveProperty('margin');
      });

      it('should set marginTop', () => {
        const styles = spacingStyles({
          mt: 's',
        });
        expect(styles).toHaveProperty('marginTop');
      });

      it('should set marginRight', () => {
        const styles = spacingStyles({
          mr: 's',
        });
        expect(styles).toHaveProperty('marginRight');
      });

      it('should set marginBottom', () => {
        const styles = spacingStyles({
          mb: 's',
        });
        expect(styles).toHaveProperty('marginBottom');
      });

      it('should set marginLeft', () => {
        const styles = spacingStyles({
          ml: 's',
        });
        expect(styles).toHaveProperty('marginLeft');
      });
    });

    describe('padding styles', () => {
      it('should set paddingLeft and paddingRight with mx', () => {
        const styles = spacingStyles({
          px: 's',
        });
        expect(styles).toHaveProperty('paddingRight');
        expect(styles).toHaveProperty('paddingLeft');
      });

      it('should set paddingTop and paddingBottom with my', () => {
        const styles = spacingStyles({
          py: 's',
        });
        expect(styles).toHaveProperty('paddingBottom');
        expect(styles).toHaveProperty('paddingTop');
      });

      it('should set padding', () => {
        const styles = spacingStyles({
          padding: 's',
        });
        expect(styles).toHaveProperty('padding');
      });

      it('should set paddingTop', () => {
        const styles = spacingStyles({
          pt: 's',
        });
        expect(styles).toHaveProperty('paddingTop');
      });

      it('should set paddingRight', () => {
        const styles = spacingStyles({
          pr: 's',
        });
        expect(styles).toHaveProperty('paddingRight');
      });

      it('should set paddingBottom', () => {
        const styles = spacingStyles({
          pb: 's',
        });
        expect(styles).toHaveProperty('paddingBottom');
      });

      it('should set paddingLeft', () => {
        const styles = spacingStyles({
          pl: 's',
        });
        expect(styles).toHaveProperty('paddingLeft');
      });
    });
  });
});
