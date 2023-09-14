import * as a from 'acorn';

const initialJson: Modules.ScriptInfo = {
  title: '',
  scope: ['Node', 'Surge', 'QX', 'Loon', 'Stash', 'ShadowRocket'],
  description: '',
  author: '',
  version: '',
  update: '',
  params: {},
  pageContent: '',
};

export const moduleParser = (content: string) => {
  let result: Modules.ScriptInfo;
  result = { ...initialJson };

  const ast = a.parse(content, {
    ecmaVersion: 2015,
    sourceType: 'module',
    locations: true,
    onComment: (isBlock, text) => {
      if (isBlock) {
        const lines = text
          .split('\n')
          .slice(1)
          .map(line => line.trim());

        if (lines[0].toLowerCase().includes('@sub-store-page')) {
          const pageContent = lines
            .slice(1)
            .map(t => t.trim().replace(/^\* ?/, ''))
            .join('\n');
          result = {
            ...result,
            pageContent: `${result.pageContent}\n${pageContent}`,
          };
        }
      }
    },
  }) as any;

  const schema = ast.body.find((t: any) => {
    if (t.type === 'VariableDeclaration') {
      if (t.declarations[0].id.name === 'SUB_STORE_SCHEMA') {
        return true;
      }
    }
    return false;
  });
  const start = schema?.declarations[0].init.start;
  const end = schema?.declarations[0].init.end;
  const code = content.slice(start, end);

  // eslint-disable-next-line no-eval
  eval(`result = {...result, ...${code}}`);

  return result;
};
