import React from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import { Result } from 'ant-design-pro';

const actions = (
  <div>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="app.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    type="success"
    title={
      <div>
        <FormattedMessage
          id="app.register-result.msg"
          values={{ email: location.state ? location.state.account : 'mei-soft@gmail.com' }}
        />
      </div>
    }
    description={formatMessage({ id: 'app.register-result.activation-email' })}
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
