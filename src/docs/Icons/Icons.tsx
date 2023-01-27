import React from 'react';
import { default as styled } from 'styled-components';
import * as allIcons from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';
import { suomifiDesignTokens } from 'suomifi-design-tokens';

const baseIconKeys = [
  'Alert',
  'AlertOff',
  'AlignLeft',
  'Archive',
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  'ArrowheadDown',
  'ArrowheadUp',
  'Attachment',
  'Authorise',
  'Basket',
  'BasketAdd',
  'Calendar',
  'CalendarChecked',
  'Chat',
  'ChatHeart',
  'ChatQuestion',
  'Check',
  'CheckCircleFilled',
  'CheckCircle',
  'CheckSelected',
  'ChevronUp',
  'ChevronRight',
  'ChevronDown',
  'ChevronLeft',
  'ChevronCircleUp',
  'ChevronCircleRight',
  'ChevronCircleDown',
  'ChevronCircleLeft',
  'Clock',
  'Close',
  'Compare',
  'CompareRemove',
  'ControlPrevious',
  'ControlPlay',
  'ControlNext',
  'Copy',
  'Disabled',
  'Download',
  'Edit',
  'ErrorFilled',
  'Error',
  'ExpandableMinus',
  'ExpandablePlus',
  'FileGeneric',
  'Fullscreen',
  'Grid',
  'HeartFilled',
  'Heart',
  'HelpFilled',
  'Help',
  'Hint',
  'History',
  'Image',
  'InfoFilled',
  'Info',
  'Internet',
  'Isa',
  'LinkBreadcrumb',
  'LinkExternal',
  'LinkList',
  'ListBulleted',
  'ListNumbered',
  'Login',
  'Logout',
  'MailSend',
  'MapLayers',
  'MapLocationFilled',
  'MapLocation',
  'MapMyLocation',
  'MapRoute',
  'Map',
  'Menu',
  'Message',
  'Minus',
  'OptionsVertical',
  'Peek',
  'Pin',
  'Phone',
  'Plus',
  'Preview',
  'Print',
  'RadioButtonOn',
  'Refresh',
  'Registers',
  'Remove',
  'Reply',
  'Save',
  'Search',
  'Settings',
  'SignLanguageContent',
  'Star',
  'StarFilled',
  'SubDirectory',
  'SwapRounded',
  'SwapVertical',
  'TransportBicycle',
  'TransportBus',
  'TransportCar',
  'TransportWalk',
  'Upload',
  'Warning',
  'Window',
];

const illustrativeIconKeys = [
  'Authorisation',
  'Book',
  'Briefcase',
  'BuildingAdministrative',
  'Buildings',
  'Catalog',
  'ChartAnalytics',
  'ChartPie',
  'ChartScreen',
  'ChartStatistic',
  'ChatBubbles',
  'Child',
  'Cogwheel',
  'Collaboration',
  'Contract',
  'Conversation',
  'Court',
  'CreditCards',
  'Database',
  'Device',
  'Display',
  'Doctor',
  'Environment',
  'Exchange',
  'Failure',
  'Family',
  'Faq',
  'Feedback',
  'FileCabinet',
  'Finance',
  'Folder',
  'Global',
  'Group',
  'Growth',
  'HandCoins',
  'HandPlate',
  'Helpdesk',
  'Home',
  'House',
  'IdBadge',
  'LaptopContent',
  'Laptop',
  'Leap',
  'Location',
  'MagicWand',
  'Mailbox',
  'ManButtons',
  'ManGlasses',
  'ManLaptop',
  'MessageSent',
  'Messages',
  'Meter',
  'MigrationFinland',
  'Money',
  'MoneyBag',
  'Organisation',
  'PhoneText',
  'PiggyBank',
  'Pillar',
  'PlaneFlying',
  'Presentation',
  'Puzzle',
  'Register',
  'Rocket',
  'ScaleBalance',
  'Scale',
  'Server',
  'Shelter',
  'Shop',
  'Smartwatch',
  'SocialSecurity',
  'Steering',
  'Success',
  'Support',
  'Swim',
  'TabletText',
  'Tablet',
  'Team',
  'Touch',
  'Train',
  'UserBadge',
  'UserProfile',
  'WebDevelopment',
  'WebService',
  'WomanButtons',
  'WomanNecklace',
];

const doctypeIconKeys = ['Doc', 'GenericFile', 'Pdf', 'Ppt', 'Xls', 'Xml'];

const logoIconKeys = [
  'Horizontal',
  'HorizontalInvert',
  'Vertical',
  'VerticalInvert',
];

const IconWrapper = styled.figure`
  display: inline-block;
  width: 160px;
  margin: 0px;
  padding: 5px;
  text-align: center;
  figcaption {
    margin-top: 0;
    margin-bottom: ${suomifiDesignTokens.spacing.m};
  }
  :active {
    .fi-icon {
      background-color: ${suomifiDesignTokens.colors.highlightLight3};
    }
  }
`;

const iconProps = (icon: string) => ({
  height: '45px',
  width: '45px',
  onClick: () => console.log(clipboardCopy(icon)),
  mousePointer: true,
});

const iconStyles = {
  margin: `${suomifiDesignTokens.spacing.xs} 0 0 0`,
  color: `${suomifiDesignTokens.colors.depthDark1}`,
};

const BaseIcons = () => (
  <div>
    {baseIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const IllustrativeIcons = () => (
  <div>
    {illustrativeIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const DoctypeIcons = () => (
  <div>
    {doctypeIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const LogoIcons = () => (
  <div>
    {logoIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const isInverted = icon.includes('Invert');
      const invertStyle = isInverted
        ? {
            background: `${suomifiDesignTokens.colors.brandBase}`,
            color: `${suomifiDesignTokens.colors.whiteBase}`,
            padding: '10px',
          }
        : {};
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName} style={invertStyle}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

export { BaseIcons, IllustrativeIcons, DoctypeIcons, LogoIcons };
