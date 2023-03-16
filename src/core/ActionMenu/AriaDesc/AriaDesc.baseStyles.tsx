import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.menu-button-actions {
    margin: 0;
    padding: 0;
  }

  &.menu-button-actions_button {
    margin: 0;
    padding: 6px;
    display: inline-block;
    position: relative;
    background-color: #034575;
    border: 1px solid #034575;
    font-size: 0.9em;
    color: white;
    border-radius: 5px;

    &:hover,
    &:active {
      padding: 4px;
      border: 3px solid #034575;
      background: #eee;
      color: #222;
      outline: none;
      margin: 0;
    }

    &[aria-expanded='true'] {
      padding: 4px;
      border: 3px solid #034575;
      background: #eee;
      color: #222;
      outline: none;
      margin: 0;
    }
  }

  &.menu-button-actions_menu {
    position: absolute;
    margin: 0;
    padding: 7px 4px;
    border: 2px solid #034575;
    border-radius: 5px;
    background-color: #eee;
    display: block;

    &--hidden {
      display: none;
    }
  }

  &.menu-button-actions_menu-item {
    margin: 0;
    padding: 6px;
    display: block;
    width: 4em;
    background-color: #eee;
    color: black;
    border-radius: 5px;

    &:focus,
    &--focus {
      padding: 4px;
      border: 2px solid #034575;
      background: #034575;
      color: #fff;
      outline: none;
      margin: 0;
    }
  }

  &.menu-button-actions_menu-separator {
    margin: 0;
    padding: 6px;
    display: block;
    width: 4em;
    background-color: #eee;
    color: black;
    border-radius: 5px;

    padding-top: 3px;
    background-image: url('../images/separator.svg');
    background-position: center;
    background-repeat: repeat-x;

    &:focus,
    &--focus {
      padding: 4px;
      border: 2px solid #034575;
      background: #034575;
      color: #fff;
      outline: none;
      margin: 0;
    }
  }

  &.menu-button-actions-button_svg--down {
    padding-left: 0.125em;
    fill: currentcolor;
    stroke: currentcolor;
  }

  .menu-button-actions button[aria-expanded='true'] svg.down {
    transform: rotate(180deg);
  }

  /* focus styling */

  .menu-button-actions button:hover,
  .menu-button-actions button:focus,
  .menu-button-actions button[aria-expanded='true'] {
    padding: 4px;
    border: 3px solid #034575;
    background: #eee;
    color: #222;
    outline: none;
    margin: 0;
  }

  .menu-button-actions [role='menuitem'].focus,
  .menu-button-actions [role='menuitem']:focus {
    padding: 4px;
    border: 2px solid #034575;
    background: #034575;
    color: #fff;
    outline: none;
    margin: 0;
  }

  input.action:focus {
    outline: 2px solid #034575;
    background: #def;
  }
`;
