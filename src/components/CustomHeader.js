import React from 'react';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';

const CustomHeader = (props) => {
    const title = props.title;
    const nav = props.nav;

    return (
        <Header backgroundColor='#e67e22' androidStatusBarColor='black' >
          <Left>
            <Button
              transparent
              onPress={() => nav.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
    );
};

export default CustomHeader;
