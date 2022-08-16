import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header, HeaderProps } from './header';
import { text } from '@storybook/addon-knobs';

export default {
  component: Header,
  title: 'Header',
} as ComponentMeta<typeof Header>;

export const primary = () => {
  const props: HeaderProps = {
    title: text('title', ''),
  };

  return <Header title={props.title} />;
};
