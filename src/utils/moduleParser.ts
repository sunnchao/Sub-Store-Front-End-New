import * as a from 'acorn';

const initialJson: Modules.ScriptInfo = {
  title: '',
  scope: [], // ['Node', 'Surge', 'QX', 'Loon', 'Stash', 'ShadowRocket']
  description: '',
  author: '',
  version: '',
  updateTime: '',
  params: {},
  pageContent: '',
};

type Output =
  | {
    ok: true
    result: Modules.ScriptInfo
  }
  | {
    ok: false
    result: string
  };

export const moduleParser = (content: string): Output => {
  let result: Modules.ScriptInfo;
  result = { ...initialJson };

  try {
    const ast = a.parse(content, {
      ecmaVersion: 'latest',
      locations: true,
      onComment: (isBlock, text) => {
        if (isBlock) {
          const lines = text
            .split('\n')
            .slice(1)
            .map(line => line.trim());

          if (lines[0]?.toLowerCase().includes('@sub-store-page')) {
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
    if (!schema) {
      return { ok: false, result: '脚本顶级作用域中未解析到 SUB_STORE_SCHEMA' };
    }

    const start = schema?.declarations[0].init.start;
    const end = schema?.declarations[0].init.end;
    const code = content.slice(start, end);

    // eslint-disable-next-line no-eval
    eval(`result = {...result, ...${code}}`);

    return { ok: true, result };
  } catch (e) {
    const err = e as {
      message: string
    };
    return { ok: false, result: err.message };
  }
};
