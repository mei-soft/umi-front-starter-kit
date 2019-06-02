import analysis from './vi-VN/analysis';
import exception from './vi-VN/exception';
import form from './vi-VN/form';
import globalHeader from './vi-VN/globalHeader';
import login from './vi-VN/login';
import menu from './vi-VN/menu';
import monitor from './vi-VN/monitor';
import result from './vi-VN/result';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';
import pwa from './vi-VN/pwa';
import component from './vi-VN/component';
import editor from './vi-VN/editor';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.home.introduce': 'introduzir',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Páginas de formulário são usadas para coletar e verificar as informações dos usuários e formulários básicos são comuns nos cenários onde existem alguns formatos de informações.',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...editor,
};
